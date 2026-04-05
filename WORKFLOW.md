# Workflow Report

## Objetivo

Analisar o workflow de deploy em [.github/workflows/deploy.yml](/home/jander-nery/Projetos/seligadev/.github/workflows/deploy.yml), identificar riscos práticos e sugerir melhorias para deixar o deploy mais previsível, seguro e fácil de manter.

## Resumo Executivo

O workflow atual funciona como um deploy remoto por SSH em 4 etapas:

1. garantir o clone e executar `git pull`
2. instalar dependências com `yarn install`
3. executar `yarn build`
4. iniciar/reiniciar o processo com PM2

Esse desenho é viável, mas hoje ele tem alguns pontos frágeis:

- faz deploy diretamente no diretório ativo do app
- depende de `git pull origin main`, o que pode gerar estado não determinístico
- usa várias conexões SSH separadas para uma mesma operação
- não valida explicitamente se o build gerou `.next/BUILD_ID`
- não garante rollback ou restart consistente
- o PM2 em produção está configurado com `watch: true`, o que aumenta risco de restart inesperado

## Pontos Bons

- deploy simples de entender
- build falha antes do restart do app
- usa secrets do GitHub Actions
- separa instalação, build e restart
- já está restrito a push na branch `main`

## Achados

### 1. `git pull origin main` torna o deploy menos determinístico

Hoje o servidor atualiza com:

```sh
git pull origin main
```

Problemas:

- o conteúdo final depende do estado atual do clone no servidor
- se houver alteração local no servidor, o `pull` pode falhar ou misturar estados
- não há garantia explícita de checkout exato do commit que disparou o workflow

Melhor abordagem:

- usar `git fetch`
- fazer `git reset --hard origin/main`

Ou ainda melhor:

- usar o SHA do commit do GitHub Actions para garantir deploy exato do que foi publicado

### 2. O workflow abre 4 sessões SSH separadas

Hoje há 4 passos com `appleboy/ssh-action`.

Impactos:

- mais latência
- mais pontos de falha
- menos controle transacional do deploy
- dificulta logs lineares

Melhor abordagem:

- consolidar tudo em um único passo SSH
- usar shell com `set -euo pipefail`

### 3. O diretório preparado no script não bate com o diretório usado

Hoje o script cria:

```sh
mkdir -p /projects
```

Mas depois usa:

```sh
/root/projects/seligadev
```

Isso não quebra o deploy diretamente, mas mostra inconsistência operacional.

Melhor abordagem:

- usar uma única variável de diretório
- por exemplo `APP_DIR=/root/projects/seligadev`

### 4. O build depende de variáveis exportadas só naquele passo

No passo de build, o workflow exporta:

- `DATABASE_URL`
- `NEXT_PUBLIC_BASE_URL`

Risco:

- o PM2 reiniciado pode não receber as mesmas variáveis se elas não estiverem no ambiente do processo
- isso gera diferença entre ambiente de build e ambiente de runtime

Melhor abordagem:

- definir as variáveis no arquivo do PM2, ou
- usar um `.env.production` controlado no servidor, ou
- passar `env` explicitamente na configuração do PM2

### 5. O restart com PM2 pode ficar inconsistente

Hoje:

```sh
pm2 update seligadev || true
pm2 start my-pm2-start.json --update-env || pm2 restart my-pm2-start.json --update-env
```

Problemas:

- `pm2 update seligadev` não é o fluxo mais claro para restart de app
- `start ... || restart ...` é funcional, mas pouco previsível para manutenção
- não há `pm2 save`

Melhor abordagem:

- usar um fluxo explícito:
  - `pm2 start my-pm2-start.json --only seligadev --update-env || pm2 restart seligadev --update-env`
- ou apagar e recriar conscientemente quando necessário
- depois executar `pm2 save`

### 6. O PM2 atual não está ideal para produção

Em [my-pm2-start.json](/home/jander-nery/Projetos/seligadev/my-pm2-start.json), hoje existe:

```json
{
  "apps": [
    {
      "name": "seligadev",
      "script": "yarn",
      "args": "start",
      "autorestart": true,
      "watch": true
    }
  ]
}
```

Problemas:

- `watch: true` em produção tende a causar restart desnecessário
- não há `cwd`
- não há `env`
- não há controle explícito de `PORT` e `NODE_ENV`

Melhor abordagem:

- `watch: false`
- definir `cwd`
- definir `env.PORT`
- definir `env.NODE_ENV=production`

### 7. Falta validação explícita do build

O histórico recente mostrou falhas como ausência de `.next/BUILD_ID`.

Hoje o workflow confia apenas no retorno de `yarn build`.

Melhor abordagem:

- após o build, validar:

```sh
test -f .next/BUILD_ID
```

Isso ajuda a detectar rapidamente builds incompletos ou ambiente inconsistente.

### 8. Falta controle de concorrência

Se dois pushes acontecerem perto um do outro, dois deploys podem rodar ao mesmo tempo.

Risco:

- restart duplicado
- estado misto no servidor
- lock em dependências

Melhor abordagem:

Adicionar `concurrency` no workflow:

```yml
concurrency:
  group: deploy-production
  cancel-in-progress: true
```

### 9. A action SSH está pinada por tag antiga

Hoje:

```yml
uses: appleboy/ssh-action@v0.1.7
```

Melhor abordagem:

- atualizar para uma versão mais recente compatível
- idealmente pinar por release mais atual ou por SHA

### 10. Não existe health check pós-deploy

Hoje o workflow termina após PM2 iniciar/reiniciar.

Risco:

- deploy “verde” no GitHub com app quebrado no ar

Melhor abordagem:

- fazer um `curl` em uma rota conhecida
- validar status 200

Exemplo:

```sh
curl -f http://127.0.0.1:4455/ || exit 1
```

## Recomendações Prioritárias

### Prioridade Alta

1. Trocar `git pull origin main` por `git fetch` + `git reset --hard origin/main`
2. Consolidar o deploy em um único passo SSH
3. Ajustar o PM2 para produção com `watch: false`, `cwd` e `env`
4. Validar `.next/BUILD_ID` após o build
5. Adicionar `concurrency`

### Prioridade Média

1. Adicionar health check após restart
2. Atualizar `appleboy/ssh-action`
3. Padronizar o diretório com variável única
4. Persistir o estado do PM2 com `pm2 save`

### Prioridade Baixa

1. Reativar notificação por e-mail ou trocar por Slack/Discord
2. Adicionar logs mais compactos e objetivos
3. Considerar deploy atômico com diretório de release futuro

## Exemplo de Workflow Melhorado

```yml
name: Deploy NextJS VPS Hostinger

on:
  push:
    branches:
      - main

concurrency:
  group: deploy-production
  cancel-in-progress: true

jobs:
  build_deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy no servidor
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            set -euo pipefail

            APP_DIR=/root/projects/seligadev
            REPO_URL=https://github.com/jnerydesigner/seligadev-site.git

            mkdir -p /root/projects

            if [ ! -d "$APP_DIR/.git" ]; then
              git clone "$REPO_URL" "$APP_DIR"
            fi

            cd "$APP_DIR"

            git fetch origin main
            git reset --hard origin/main

            yarn install --frozen-lockfile

            export DATABASE_URL='${{ secrets.DATABASE_URL }}'
            export NEXT_PUBLIC_BASE_URL='${{ secrets.NEXT_PUBLIC_BASE_URL }}'

            yarn build
            test -f .next/BUILD_ID

            pm2 start my-pm2-start.json --only seligadev --update-env || pm2 restart seligadev --update-env
            pm2 save

            curl -f http://127.0.0.1:4455/ > /dev/null
```

## Exemplo de PM2 Melhorado

Sugestão para [my-pm2-start.json](/home/jander-nery/Projetos/seligadev/my-pm2-start.json):

```json
{
  "apps": [
    {
      "name": "seligadev",
      "cwd": "/root/projects/seligadev",
      "script": "yarn",
      "args": "start",
      "autorestart": true,
      "watch": false,
      "env": {
        "NODE_ENV": "production",
        "PORT": "4455"
      }
    }
  ]
}
```

## Conclusão

O workflow atual é funcional, mas ainda está mais próximo de um deploy manual automatizado do que de um pipeline de produção robusto. As melhorias mais importantes são previsibilidade do código deployado, consistência do restart e validação pós-build.

Se eu fosse aplicar em ordem, faria assim:

1. ajustar PM2
2. consolidar o SSH em um passo
3. trocar `git pull` por `fetch + reset`
4. validar `.next/BUILD_ID`
5. adicionar health check

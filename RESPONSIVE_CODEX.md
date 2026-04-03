# Responsive Codex

## Objetivo

Este documento registra a analise da responsividade do projeto `seligadev`, os gargalos estruturais encontrados e um plano de desenvolvimento em fases para estabilizar a experiencia em mobile, tablet e desktop.

## Resumo Executivo

O site tem uma identidade visual forte e consistente, mas hoje a responsividade sofre principalmente por quatro padroes recorrentes:

1. Containers globais com largura e altura rigidas.
2. Componentes com `h-[...]`, `w-[...]` e `md:h-[...]` fixos demais.
3. Titulos e blocos internos com padding agressivo e pouco espaco para quebra de linha.
4. Componentes reutilizados sem um contrato responsivo unico.

O resultado disso e:

- cards com alturas diferentes e alinhamento quebrado;
- overflow visual em telas pequenas;
- blocos que ficam "espremidos" em tablets;
- areas com excesso de largura vazia em desktop;
- comportamento inconsistente entre paginas.

## Analise Estrutural

### 1. Layout global

Arquivos analisados:

- `src/app/layout.tsx`
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/components/page-container.tsx`

Problemas encontrados:

- uso de `h-[100vh]` no wrapper principal;
- largura principal limitada por `w-[95%]` e `md:w-[70%]`, o que gera comportamento pouco previsivel entre breakpoints;
- header com navegação quebrando por falta de estrategia dedicada para mobile;
- footer com altura fixa e texto comprimido.

Impacto:

- scroll e distribuicao vertical inconsistentes;
- navegacao mais fragil em telas intermediarias;
- layout central com "saltos" de largura.

### 2. Home

Arquivos analisados:

- `src/app/page.tsx`
- `src/components/hero.tsx`
- `src/components/card-flex-home.tsx`
- `src/components/card-home.tsx`
- `src/components/ticker.tsx`

Problemas encontrados:

- grid com colunas assimetricas e componentes internos com alturas fixas concorrentes;
- hero e card lateral disputando altura da primeira dobra;
- textos grandes usando `font-bangers` sem ajuste fino para linhas menores;
- CTA e conteudos secundarios sem regras claras de alinhamento em mobile.

Impacto:

- primeira dobra desalinhada;
- cards laterais "fora da caixa";
- leitura pior em tablets pequenos.

### 3. Blog e listagens

Arquivos analisados:

- `src/app/blog/page.tsx`
- `src/components/card-blog.tsx`
- `src/components/title.tsx`

Problemas encontrados:

- card de blog com largura interna `w-[80%]`, o que aperta desnecessariamente o texto em mobile;
- alturas fixas em desktop sem estrategia de adaptacao progressiva;
- titulo de secao com padding muito agressivo em viewport pequena.

Impacto:

- titulo quebra de forma ruim;
- leitura do resumo varia demais entre mobile e desktop;
- cards perdem aproveitamento horizontal.

### 4. Paginas com altura rigida

Arquivos analisados:

- `src/app/buy-my-coffee/page.tsx`
- `src/components/planConsult.tsx`
- `src/components/post-container-directus.tsx`
- `src/components/card-video.tsx`
- `src/components/card-product.tsx`

Problemas encontrados:

- seções com `h-160`, `h-185`, `h-[300px]`, `h-[260px]`, `h-40` etc;
- QR code, banners e thumbs presos a tamanhos fixos;
- componentes de lista sem padrao comum de espacamento vertical.

Impacto:

- risco alto de quebra em celulares pequenos;
- excesso de espaco vazio em alguns tamanhos;
- cards com proporção boa em uma tela e ruim em outra.

## Padrões Problemáticos Encontrados

### Alturas fixas

Uso excessivo de:

- `h-[100vh]`
- `h-160`
- `h-185`
- `h-[300px]`
- `md:h-[370px]`
- `md:h-40`

Recomendacao:

- preferir `min-h-*`, `h-auto`, `aspect-*`, `flex-1` e distribuicao por grid/flex.

### Larguras rigidas

Uso recorrente de:

- `w-[95%]`
- `md:w-[70%]`
- `w-[80%]`
- `w-[100%]`

Recomendacao:

- preferir `w-full`, `max-w-*`, `mx-auto`, `px-*` responsivo.

### Tipografia sem compressao responsiva

O projeto usa `font-bangers`, que e parte forte da identidade visual. O problema nao e a fonte, e sim o uso sem:

- ajuste de `font-size` por breakpoint;
- limitacao de largura de texto;
- controle de `line-height`;
- refinamento do `tracking`.

### Responsividade distribuida e nao sistemica

Hoje cada componente tenta resolver seu proprio comportamento. Falta um contrato visual compartilhado para:

- containers;
- titulos de secao;
- cards;
- areas de imagem;
- CTAs.

## Correções Aplicadas Nesta Iteracao

### Ja ajustado

- `src/app/layout.tsx`
  - remocao do `h-[100vh]`;
  - container principal migrado para `w-full` com `max-w-7xl` e paddings progressivos.

- `src/components/header.tsx`
  - padding horizontal mais flexivel;
  - logo menor em telas pequenas;
  - navegacao com melhor wrap.

- `src/components/nav-item.tsx`
  - tamanho de texto e padding reduzidos para caber melhor no mobile.

- `src/components/footer.tsx`
  - remocao de altura fixa;
  - texto com wrap e alinhamento central.

- `src/components/title.tsx`
  - secao de titulo adaptada para telas pequenas com padding menor e tipografia mais controlada.

- `src/components/card-blog.tsx`
  - resumo agora ocupa largura total no mobile;
  - titulo menos agressivo;
  - espacamento externo reduzido em telas pequenas.

- `src/components/card-home.tsx`
  - card horizontal/vertical com melhor fallback no mobile;
  - CTA com largura fluida.

- `src/components/card-flex-home.tsx`
  - melhor distribuicao interna;
  - titulo responsivo;
  - bloco preparado para preencher a altura disponivel.

- `src/app/blog/page.tsx`
  - container simplificado para `w-full`.

- `src/app/setup/page.tsx`
  - remocao de largura rigida e do `console.log`.

- `src/app/buy-my-coffee/page.tsx`
  - remocao de altura fixa;
  - QR code com escala progressiva;
  - container limitado por `max-w-3xl`.

## Plano de Desenvolvimento

### Fase 1. Estabilizacao estrutural

Status: parcialmente aplicada nesta iteracao.

Objetivo:

- corrigir container global;
- remover alturas mais perigosas;
- tornar header, footer e titulos resilientes.

Checklist:

- [x] remover `h-[100vh]` do layout;
- [x] padronizar largura maxima do app;
- [x] melhorar wrap da navegacao;
- [x] remover altura fixa do footer;
- [x] reduzir agressividade dos titulos principais.

### Fase 2. Biblioteca de padrões responsivos

Status: pendente.

Objetivo:

- criar um padrão consistente de cards e seções.

Acoes:

- criar classes utilitarias ou variantes para:
  - `section-shell`
  - `content-shell`
  - `media-shell`
  - `cta-shell`
- unificar comportamento de `CardHome`, `CardFlexHome`, `CardBlog`, `CardVideo`, `CardProduct`;
- substituir larguras como `w-[80%]` por tokens fluidos.

### Fase 3. Auditoria por pagina

Status: pendente.

Prioridade sugerida:

1. `src/app/page.tsx`
2. `src/app/blog/page.tsx`
3. `src/app/setup/page.tsx`
4. `src/app/buy-my-coffee/page.tsx`
5. `src/app/consult/page.tsx`
6. `src/app/videos/page.tsx`
7. `src/app/shorts/page.tsx`
8. `src/app/hostinger/page.tsx`
9. `src/app/blog/[slug]/page.tsx`
10. `src/app/setup/[slug]/page.tsx`

Em cada pagina validar:

- 360px
- 390px
- 768px
- 1024px
- 1280px

### Fase 4. Imagens e mídia

Status: pendente.

Objetivo:

- garantir que thumbs, banners, avatar e QR code obedeçam proporcoes fluidas.

Acoes:

- preferir `aspect-video`, `aspect-square`, `object-cover` ou `object-contain` conforme caso;
- evitar alturas fixas para imagens fora de contextos estritamente controlados;
- revisar `post-container-directus`, `card-video`, `card-product`, `planConsult`.

### Fase 5. Tipografia e legibilidade

Status: pendente.

Objetivo:

- manter a identidade visual sem sacrificar leitura.

Acoes:

- suavizar `tracking` da `font-bangers` em telas pequenas;
- revisar headings com tamanhos fluidos;
- garantir `line-clamp` e larguras de texto coerentes;
- limitar linhas de leitura em conteudo longo.

### Fase 6. QA responsivo

Status: pendente.

Objetivo:

- validar sistematicamente depois das correcoes.

Checklist de QA:

- sem overflow horizontal;
- sem texto cortado em buttons/cards;
- sem CTA fora da dobra por causa de altura fixa;
- sem desalinhamento entre colunas vizinhas;
- sem imagens distorcidas;
- sem blocos com espacamento excessivo em desktop.

## Componentes que Merecem Proxima Intervencao

### Alta prioridade

- `src/components/planConsult.tsx`
- `src/components/post-container-directus.tsx`
- `src/components/card-video.tsx`
- `src/components/card-product.tsx`
- `src/components/ticker.tsx`

### Media prioridade

- `src/components/resume.tsx`
- `src/components/hostingerPlans.tsx`
- `src/components/last-post-blog.tsx`
- `src/components/consult.tsx`

## Riscos Tecnicos

- Alguns componentes estao visualmente alinhados por coincidencia, nao por estrutura.
- Ha mistura de layouts fluidos com tamanhos absolutos.
- O projeto ainda carece de uma camada de testes visuais ou checklist automatizado de breakpoints.
- O uso de muitos estilos inline de utilitarios sem padrao central dificulta manutencao futura.

## Recomendacao Final

O melhor caminho nao e corrigir pagina por pagina de forma isolada. O projeto precisa de uma pequena camada de sistema responsivo, mesmo mantendo a identidade halftone e a tipografia forte.

Sequencia recomendada:

1. consolidar wrappers e titulos reutilizaveis;
2. padronizar cards;
3. revisar paginas com midia;
4. validar breakpoints com checklist fixo.

Com isso, a responsividade deixa de ser "ajuste manual por tela" e passa a ser comportamento previsivel do projeto inteiro.

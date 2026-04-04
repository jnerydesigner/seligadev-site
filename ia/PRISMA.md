# Prisma Map

## Objetivo

Este arquivo lista os pontos do projeto que ainda dependem do Prisma, seja por consultas diretas ao banco, seja por dependências indiretas como tipos importados de `@prisma/client`.

## Base do Prisma

Arquivo central:

- `src/lib/prisma.ts`

Responsabilidade:

- instancia e reaproveita um `PrismaClient`;
- exporta o client usado pelas páginas server-side.

Dependência de pacote:

- `package.json`
  - `@prisma/client`

Schema:

- `prisma/schema.prisma`

Modelos encontrados no schema que ainda aparecem no app:

- `Videos`
- `Setup`
- `User`
- `Post`
- `SocialMedia`
- `PersonalInfo`
- relacionamentos do currículo (`ContactInfo`, `Education`, `Certification`, `Experience`, `Skills`, `Languages`)

## Chamadas Diretas ao Prisma

### Home

- `src/app/page.tsx`

Uso:

- `prisma.post.findMany({ take: 5 })`

Finalidade:

- buscar os 5 posts usados no ticker da home.

Modelo Prisma:

- `Post`

### Blog - listagem

- `src/app/blog/page.tsx`

Uso:

- `prisma.post.findMany()`

Finalidade:

- carregar posts legados do banco Prisma para a listagem do blog.
- hoje essa página mistura Prisma com Directus.

Modelo Prisma:

- `Post`

### Blog - detalhe

- `src/app/blog/[slug]/page.tsx`

Usos:

- `prisma.post.findFirst({ where: { slug } })`
- `prisma.post.findFirst({ where: { slug }, include: { user: { include: { socialMedias: true } } } })`

Finalidade:

- gerar metadata para posts legados;
- renderizar o post legado completo quando o conteúdo não vier do Directus.

Modelo Prisma:

- `Post`
- `User`
- `SocialMedia`

Observação:

- essa rota também usa Directus como fallback principal, então hoje ela convive em modo híbrido.

### Vídeos

- `src/app/videos/page.tsx`

Uso:

- `prisma.videos.findMany()`

Finalidade:

- carregar os vídeos exibidos na página `/videos`.

Modelo Prisma:

- `Videos`

### Currículo

- `src/app/resume/[slug]/page.tsx`

Usos:

- `prisma.personalInfo.findFirst(...)` em `generateMetadata`
- `prisma.personalInfo.findFirst(...)` na renderização da página

Finalidade:

- buscar o currículo completo por `slug`, incluindo relações.

Includes usados:

- `contact`
- `education`
- `certification`
- `skills.skillFrontend`
- `skills.skillDatabase`
- `skills.skillTool`
- `skills.skillMethodology`
- `skills.skillBackend`
- `experience.descriptions`
- `languages`

Modelo Prisma:

- `PersonalInfo` e relações do módulo de currículo

### Sitemap

- `src/app/sitemap.ts`

Usos:

- `prisma.setup.findMany()`
- `prisma.post.findMany()`

Finalidade:

- gerar URLs dinâmicas de setup e blog no sitemap.

Modelos Prisma:

- `Setup`
- `Post`

## Dependências Indiretas do Prisma

### Mapper de posts

- `src/types/mapper/post.mapper.ts`

Uso:

- importa `SocialMedia`, `Post` e `User` de `@prisma/client`

Finalidade:

- mapear entidades Prisma para `PostType`.

Impacto:

- mesmo que as consultas sejam migradas para Directus, esse mapper ainda fica acoplado ao Prisma enquanto usar esses tipos.

### Mapper de currículo

- `src/types/mapper/resume.mapper.ts`

Uso:

- importa `PersonalInfo as Personal` de `@prisma/client`

Finalidade:

- atualmente o import nem é usado de fato.

Impacto:

- dependência indireta desnecessária; pode ser removida sem impacto funcional.

## Imports Relacionados ao Prisma que Estão Sobrando

### Buy My Coffee

- `src/app/buy-my-coffee/page.tsx`

Situação:

- existe `import prisma from "@/lib/prisma";`
- não há nenhuma chamada `prisma.*` no arquivo.

Conclusão:

- import sobrando e pode ser removido.

## Resumo por Arquivo

- `src/lib/prisma.ts`
  - infraestrutura do client Prisma

- `src/app/page.tsx`
  - consulta `Post` para ticker da home

- `src/app/blog/page.tsx`
  - consulta `Post` para listagem legada

- `src/app/blog/[slug]/page.tsx`
  - consulta `Post` + `User` + `SocialMedia` para metadata e fallback legados

- `src/app/videos/page.tsx`
  - consulta `Videos`

- `src/app/resume/[slug]/page.tsx`
  - consulta `PersonalInfo` e relações do currículo

- `src/app/sitemap.ts`
  - consulta `Setup` e `Post`

- `src/types/mapper/post.mapper.ts`
  - usa tipos Prisma

- `src/types/mapper/resume.mapper.ts`
  - importa tipo Prisma sem uso real

- `src/app/buy-my-coffee/page.tsx`
  - import Prisma sem uso

## Prioridade de Migração

Se a ideia for remover Prisma aos poucos, a ordem mais segura parece ser:

1. remover imports sem uso
2. migrar páginas híbridas do blog (`/blog` e `/blog/[slug]`)
3. migrar sitemap
4. migrar vídeos
5. migrar currículo
6. remover tipos Prisma dos mappers

## Conclusão

Hoje o Prisma ainda está ativo principalmente em:

- blog legado
- vídeos
- currículo
- sitemap
- ticker da home

Além disso, ainda existem acoplamentos indiretos em mappers e pelo menos um import sobrando que já pode ser limpo.

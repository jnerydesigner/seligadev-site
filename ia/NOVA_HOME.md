# Nova Home

## Viabilidade

A probabilidade de implementar essa nova seção com baixo risco é alta.

Estimativa prática:

- viabilidade técnica: alta
- risco de impacto no restante da home: baixo
- reaproveitamento de código existente: alto

Motivos:

- a home já busca os últimos posts;
- já existe card para destaque (`CardHome`);
- já existe card de post (`CardBlog`);
- o layout atual da home já trabalha com grid em 12 colunas;
- a nova seção pode entrar abaixo dos blocos atuais, sem mexer no hero nem no card de consultoria.

## Objetivo

Criar uma nova seção na home contendo:

- 1 card principal em formato de coluna vertical, no lado esquerdo
- 4 cards menores com os últimos 4 posts, em grid 2x2 no lado direito

Mantendo:

- hero
- consultoria premium
- card da Hostinger
- ticker

Ou seja, a home continua como está e ganha uma seção nova logo abaixo.

## Estrutura Visual Desejada

Layout desktop:

- coluna esquerda:
  - 1 card grande vertical
- coluna direita:
  - grid com 4 cards menores
  - 2 colunas
  - 2 linhas

Layout tablet:

- card principal em cima
- grid 2x2 abaixo, se houver espaço

Layout mobile:

- card principal primeiro
- os 4 cards empilhados ou em grid de 1 coluna

## Fonte de Dados

Agora a recomendação é considerar Directus como fonte oficial dessa nova seção.

Plano recomendado:

- buscar 5 posts do Directus
- separar assim:
  - `featuredPost = posts[0]`
  - `recentPosts = posts.slice(1, 5)`

Como você vai fazer a chamada depois, a implementação inicial pode nascer com dados simulados, mantendo o componente pronto para receber o payload real.

### Shape sugerido para a seção

```ts
type HomePostPreview = {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  banner?: string | null;
  imageUrl?: string | null;
  dateCreated?: string;
};
```

### Simulação temporária

Enquanto a chamada do Directus não entra, a seção pode usar algo assim:

```ts
const simulatedHomePosts: HomePostPreview[] = [
  {
    id: 1,
    title: "Prisma + NestJS: iniciando o acesso ao banco de dados",
    slug: "prisma-nestjs-iniciando-o-acesso-ao-banco",
    content: "Aprenda a conectar sua API NestJS ao banco de dados usando Prisma.",
    banner: "/no-image.png",
    dateCreated: "2026-04-05T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Cansei de reescrever a mesma lógica de query no NestJS",
    slug: "cansei-de-reescrever-query-nestjs",
    content: "Uma abordagem simples para reaproveitar filtros e paginação.",
    banner: "/no-image.png",
    dateCreated: "2026-04-04T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Destrinchando o NestJS do zero ao primeiro endpoint",
    slug: "destrinchando-o-nestjs-do-zero",
    content: "Uma introdução prática para começar com NestJS sem complicação.",
    banner: "/no-image.png",
    dateCreated: "2026-04-03T10:00:00.000Z",
  },
  {
    id: 4,
    title: "Como organizar melhor seus módulos no backend",
    slug: "como-organizar-melhor-seus-modulos",
    content: "Dicas para estruturar projetos backend com mais clareza.",
    banner: "/no-image.png",
    dateCreated: "2026-04-02T10:00:00.000Z",
  },
  {
    id: 5,
    title: "Boas práticas para publicar conteúdo técnico no blog",
    slug: "boas-praticas-para-publicar-conteudo-tecnico",
    content: "Como deixar seus artigos mais legíveis, escaneáveis e úteis.",
    banner: "/no-image.png",
    dateCreated: "2026-04-01T10:00:00.000Z",
  },
];

const featuredPost = simulatedHomePosts[0] ?? null;
const recentPosts = simulatedHomePosts.slice(1, 5);
```

## Estratégia de Implementação

### Fase 1. Criar a nova seção da home

Criar um novo componente, por exemplo:

- `src/components/home-posts-section.tsx`

Responsabilidade:

- receber 1 post em destaque
- receber 4 posts secundários
- renderizar a composição visual da seção

Props sugeridas:

```ts
interface HomePostsSectionProps {
  featuredPost: {
    id: number | string;
    title: string;
    slug: string;
    content: string;
    banner?: string | null;
    imageUrl?: string | null;
    dateCreated?: string;
  };
  recentPosts: {
    id: number | string;
    title: string;
    slug: string;
    content: string;
    banner?: string | null;
    imageUrl?: string | null;
    dateCreated?: string;
  }[];
}
```

### Fase 2. Criar dois tipos de card

Recomendação:

- não reaproveitar `CardHome` diretamente para o post principal
- não reaproveitar `CardBlog` diretamente para os 4 menores sem adaptação

Motivo:

- `CardHome` foi pensado para CTA estático;
- `CardBlog` foi pensado para listagem horizontal de blog;
- a nova seção precisa de uma linguagem própria, mais editorial.

Melhor caminho:

- criar um card principal novo
- criar um card secundário novo

Sugestões:

- `HomeFeaturedPostCard`
- `HomePostMiniCard`

### Fase 3. Card principal

Responsabilidade:

- destacar o post mais novo
- ocupar bastante altura
- ter mais força visual

Conteúdo ideal:

- imagem
- título
- resumo limpo
- CTA tipo “Ler artigo”

Comportamento:

- vertical
- imagem maior
- line clamp controlado

### Fase 4. Cards secundários

Responsabilidade:

- mostrar os 4 posts seguintes
- priorizar leitura rápida

Conteúdo ideal:

- mini thumb
- título
- resumo curto

Comportamento:

- cards uniformes
- mesma altura no desktop
- empilhamento seguro no mobile

## Estrutura de Grid Recomendada

### Desktop

Container da seção:

- `grid-cols-12`

Distribuição:

- destaque: `col-span-12 lg:col-span-4`
- grid secundário: `col-span-12 lg:col-span-8`

Grid interno da direita:

- `grid-cols-1 sm:grid-cols-2`

Isso dá:

- mobile: tudo empilhado
- tablet: dois por linha
- desktop: composição parecida com o wireframe

## Ordem de Inserção na Home

Arquivo:

- `src/app/page.tsx`

Posição sugerida:

- abaixo do bloco atual que contém o card da Hostinger
- antes de qualquer futura seção de vídeos, sponsors ou setup

Fluxo:

1. manter ticker
2. manter hero + consultoria
3. manter card da Hostinger
4. adicionar nova seção “Últimos Posts”

## Lógica de Dados

Como a chamada real ficará com você, o componente deve nascer desacoplado da busca.

### Fase provisória

No `page.tsx`, usar os dados simulados:

```ts
const featuredPost = simulatedHomePosts[0] ?? null;
const recentPosts = simulatedHomePosts.slice(1, 5);
```

### Fase final com Directus

A ideia final é algo nessa linha:

```ts
const { data: posts } = await getPosts(1, 5);

const featuredPost = posts[0] ?? null;
const recentPosts = posts.slice(1, 5);
```

### Ajuste importante para o payload do Directus

Como o Directus hoje retorna `banner`, e não necessariamente `imageUrl`, o novo card deve aceitar:

- `banner`
- `imageUrl`

E resolver a imagem assim:

1. se vier `imageUrl`, usar direto
2. se vier `banner`, converter com helper de asset do Directus
3. fallback para `/no-image.png`

## Tratamento de Conteúdo

Como os posts podem vir em markdown ou HTML:

- reaproveitar `ConvertMdToText`
- gerar resumo curto no servidor

Sugestão:

- card principal: 180 a 220 caracteres
- cards menores: 90 a 130 caracteres

## SEO

Impacto em SEO: positivo

Porque:

- aumenta a interligação interna da home com os posts
- distribui autoridade para páginas recentes
- destaca conteúdo novo logo na primeira dobra ou logo abaixo dela

Recomendação:

- usar links reais para `/blog/[slug]`
- não esconder a seção atrás de tabs ou carrossel

## Responsividade

Checklist de comportamento:

- mobile:
  - 1 coluna
  - destaque primeiro
  - cards menores abaixo

- tablet:
  - destaque em cima
  - grid 2x2 abaixo

- desktop:
  - destaque na esquerda
  - grid 2x2 na direita

Pontos de atenção:

- manter alturas visuais equilibradas
- não usar altura fixa agressiva
- usar `aspect-*` para thumbs

## Riscos

### Risco 1. Payload do Directus diferente do card

Hoje o Directus retorna estrutura diferente do antigo Prisma.

Impacto:

- o card pode nascer acoplado ao shape errado

Mitigação:

- criar a seção com props genéricas
- deixar a origem dos dados separada do layout
- aceitar `banner` e `imageUrl`

### Risco 2. Card principal reutilizado de forma inadequada

Se você tentar forçar `CardHome` para virar card de post:

- o visual pode ficar “CTA demais” e “editorial de menos”

Mitigação:

- criar componentes específicos para essa seção

### Risco 3. Ordenação dos posts

Se a query do Directus não vier ordenada por data:

- os “últimos posts” podem não ser realmente os mais recentes

Mitigação:

- ordenar por `date_created` na chamada real

## Plano de Implementação

### Etapa 1

Definir o shape temporário da simulação:

- `simulatedHomePosts`
- `featuredPost`
- `recentPosts`

### Etapa 2

Criar:

- `HomePostsSection`
- `HomeFeaturedPostCard`
- `HomePostMiniCard`

### Etapa 3

Integrar em:

- `src/app/page.tsx`

Sem remover nenhum bloco atual.

### Etapa 3.1

Usar simulação local até a chamada real existir.

### Etapa 3.2

Quando você fizer a chamada:

- trocar a simulação pelo retorno do Directus
- manter o mesmo shape das props

### Etapa 4

Ajustar responsividade:

- mobile
- tablet
- desktop

### Etapa 5

Revisar consistência visual:

- halftone
- bordas
- peso tipográfico
- thumbnails

## Conclusão

Essa implementação é totalmente viável e faz sentido para a evolução da home.

A melhor abordagem não é adaptar à força os cards atuais, e sim:

- manter os componentes existentes onde já funcionam bem
- criar uma nova seção editorial específica para “últimos posts”

Isso reduz risco, preserva a home atual e abre espaço para uma seção mais forte visualmente.

# Prisma To Directus

## Objetivo

Este documento descreve como substituir os pontos ainda dependentes do Prisma por objetos no Directus.

A ideia aqui nao e implementar agora, e sim te dar um blueprint para:

- criar as collections no Directus;
- definir os relacionamentos;
- prever o JSON retornado por cada rota;
- decidir quais tipos e mappers precisarao ser criados ou ajustados no frontend.

## Escopo Atual do Prisma

Segundo o levantamento em [PRISMA.md](/home/jander-nery/Projetos/seligadev/PRISMA.md), o Prisma ainda atende principalmente:

- home ticker de posts
- blog legado
- detalhe de post legado
- videos
- resume/curriculo
- sitemap dinamico

## Como o projeto já pensa o Directus hoje

Pelo código atual, o padrão do Directus no projeto está organizado assim:

- collection principal
- relações many-to-many ou one-to-many resolvidas por campos relacionais
- leitura com `readItems` ou `readSingleton`
- retorno tipado em `src/types/*`
- transformação opcional por mapper

Exemplos já existentes:

- `post` com `post_author` e `blog`
- `setup` com `setup_items`
- `technologies` com `tech` e `services`

Isso sugere que a migração ideal do Prisma deve seguir o mesmo estilo, em vez de tentar espelhar o schema do Prisma 1:1.

## Estratégia Geral de Migração

### Regra prática

Para cada domínio hoje servido pelo Prisma:

1. criar a collection principal no Directus
2. criar collections auxiliares quando houver arrays/relacionamentos
3. definir o JSON “expandido” que o frontend realmente precisa
4. criar um tipo Directus dedicado em `src/types`
5. criar ou adaptar um mapper quando o formato da UI for diferente do formato da API

### Regra de modelagem

Evitar trazer para o Directus estruturas muito “acopladas ao Prisma”.

Melhor caminho:

- modelar para o CMS
- expor relações claras
- deixar mappers no frontend montarem o shape final da UI

## Domínio 1: Posts Legados

Hoje o Directus já possui:

- `post`
- `author`
- `social_media`
- `blog`

Isso já cobre quase toda a substituição do Prisma para blog.

### O que o Prisma atendia

Modelos Prisma:

- `Post`
- `User`
- `SocialMedia`

Campos usados no frontend:

- post:
  - `id`
  - `title`
  - `slug`
  - `content`
  - `imageUrl`
  - `newsSource`
  - `newsSourceUrl`
- user:
  - `name`
  - `email`
  - `avatarUrl`
- social media:
  - `id`
  - `name`
  - `slug`
  - `url`

### Equivalente no Directus

Collections:

- `post`
- `author`
- `social_media`
- `blog`

Relações desejadas:

- `post` -> many-to-many com `blog`
- `post` -> many-to-many ou many-to-one com `author`
- `author` -> many-to-many com `social_media`

### Shape recomendado da collection `post`

Campos recomendados:

- `id`
- `title`
- `slug`
- `content`
- `font_title`
- `font_link`
- `banner`
- `status` opcional
- `published_at` opcional

Campos relacionais:

- `blog`
- `post_author`

### JSON do Directus esperado para listagem de posts

Esse shape já é muito próximo do que o app usa hoje:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Meu post",
      "slug": "meu-post",
      "content": "<p>conteudo</p>",
      "font_title": "Fonte original",
      "font_link": "https://fonte.com/post",
      "banner": "asset-id",
      "blog": [
        {
          "blog_id": {
            "id": 2,
            "title": "Noticias Gerais",
            "slug": "noticias-gerais"
          }
        }
      ],
      "post_author": [
        {
          "author_id": {
            "id": 3,
            "name": "Jander Nery",
            "avatar_url": "https://...",
            "author_social_medias": [
              {
                "social_media_id": {
                  "id": 10,
                  "name": "LinkedIn",
                  "slug": "linkedin",
                  "url": "https://linkedin.com/in/...",
                  "icone": "asset-id"
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "meta": {
    "filter_count": 1
  }
}
```

### Mapper recomendado para posts

Arquivo sugerido:

- `src/types/mapper/post-directus.mapper.ts`

Responsabilidade:

- converter `PostData` do Directus para o shape de UI atual `PostType`

Entrada:

- `PostData`

Saída:

```ts
type PostType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  newsSource: string;
  newsSourceUrl: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
    socialMedias: {
      id: string;
      name: string;
      slug: string;
      url: string;
    }[];
  };
};
```

### Ajustes necessários no tipo atual

Hoje `src/types/post-directus.type.ts` ainda nao inclui alguns campos úteis para substituir 100% o Prisma:

- `author.email` nao existe
- `createdAt` do autor nao está mapeado para o shape esperado pela UI
- `font_title` e `font_link` estão corretos, mas ainda usam nomes diferentes do Prisma

Recomendação:

- manter o Directus com nomes próprios do CMS;
- adaptar tudo via mapper em vez de tentar renomear o schema do Directus para imitar Prisma.

## Domínio 2: Home Ticker

Hoje a home usa Prisma só para:

- buscar `title`
- buscar `slug`

### Substituição recomendada

Usar a collection `post` do Directus.

### Query sugerida

Collection:

- `post`

Fields:

- `id`
- `title`
- `slug`

Filtro opcional:

- `sort: ["-date_created"]`
- `limit: 5`

### JSON esperado

```json
{
  "data": [
    { "id": 1, "title": "Post A", "slug": "post-a" },
    { "id": 2, "title": "Post B", "slug": "post-b" }
  ]
}
```

### Tipo sugerido

```ts
export interface TickerPostDirectusResponse {
  data: {
    id: number;
    title: string;
    slug: string;
  }[];
}
```

Mapper:

- provavelmente desnecessário;
- o próprio componente já consome `{ title, slug }`.

## Domínio 3: Videos

Hoje o Prisma atende a página `/videos` via model `Videos`.

### Model Prisma atual

Campos:

- `id`
- `title`
- `slug`
- `content`
- `url`
- `thumb`
- `createdAt`

### Collection sugerida no Directus

Nome sugerido:

- `videos`

Campos:

- `id`
- `title`
- `slug`
- `content`
- `url`
- `thumb`
- `date_created`

Observação:

- esse domínio é simples e pode ser uma migração quase direta.

### JSON esperado

```json
{
  "data": [
    {
      "id": 1,
      "title": "Video 1",
      "slug": "video-1",
      "content": "descricao opcional",
      "url": "https://youtube.com/...",
      "thumb": "https://i.ytimg.com/...",
      "date_created": "2026-04-03T00:00:00.000Z"
    }
  ]
}
```

### Tipo sugerido

```ts
export interface VideoDirectusResponse {
  data: VideoDirectusItem[];
}

export interface VideoDirectusItem {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  url: string;
  thumb: string;
  date_created: string;
}
```

### Mapper recomendado

Arquivo sugerido:

- `src/types/mapper/video.mapper.ts`

Transformação:

```ts
type VideoProps = {
  title: string;
  thumb: string;
  url: string;
};
```

Na prática:

- mapper simples ou nenhum mapper, se o frontend passar a aceitar o shape do Directus diretamente.

## Domínio 4: Resume / Currículo

Esse é o domínio mais complexo da migração.

Hoje o Prisma usa:

- `PersonalInfo`
- `ContactInfo`
- `Education`
- `Certification`
- `Experience`
- `ExperienceDescription`
- `Skills`
- `SkillBackend`
- `SkillFrontend`
- `SkillDatabase`
- `SkillTool`
- `SkillMethodology`
- `Languages`

### O que a UI realmente consome

O componente [resume.tsx](/home/jander-nery/Projetos/seligadev/src/components/resume.tsx) consome um objeto final do tipo `PersonalInfo`.

Esse shape já é, na prática, o contrato funcional da tela.

### Melhor modelagem no Directus

Em vez de copiar o Prisma literalmente, o melhor é modelar assim:

Collection principal:

- `resume`

Campos simples:

- `id`
- `name`
- `title`
- `avatar_url`
- `location`
- `slug`
- `summary`

Relações:

- `contact`
- `education`
- `certification`
- `experience`
- `languages`
- `skills`

### Collections auxiliares sugeridas

- `resume_contact`
- `resume_education`
- `resume_certification`
- `resume_experience`
- `resume_experience_description`
- `resume_skill_group`
- `resume_skill_backend`
- `resume_skill_frontend`
- `resume_skill_database`
- `resume_skill_tool`
- `resume_skill_methodology`
- `resume_language`

### Alternativa mais enxuta

Se você quiser reduzir complexidade no Directus, pode usar:

- `resume`
- `resume_contact`
- `resume_education`
- `resume_certification`
- `resume_experience`
- `resume_experience_description`
- `resume_language`

E dentro de `resume`, armazenar os grupos de skills como JSON.

Exemplo:

- `skills_backend: json`
- `skills_frontend: json`
- `skills_database: json`
- `skills_tool: json`
- `skills_methodology: json`

Essa alternativa simplifica o CMS, mas perde parte do poder relacional.

### Recomendação

Se você pretende editar habilidades frequentemente no painel:

- use collections relacionais.

Se você quer rapidez de implementação:

- use JSON para grupos de skills.

### JSON relacional completo esperado

```json
{
  "data": [
    {
      "id": 1,
      "name": "Jander Nery",
      "title": "Backend Developer",
      "avatar_url": "https://...",
      "location": "Manaus, AM",
      "slug": "resume-jander-da-costa-nery",
      "summary": "Resumo profissional...",
      "contact": {
        "id": 1,
        "phone": "...",
        "email": "...",
        "linkedin": "...",
        "github": "...",
        "portfolio": "...",
        "youtube": "..."
      },
      "education": [
        {
          "id": 1,
          "degree": "...",
          "institution": "...",
          "period": "..."
        }
      ],
      "certification": [
        {
          "id": 1,
          "name": "...",
          "description": "..."
        }
      ],
      "experience": [
        {
          "id": 1,
          "company": "...",
          "position": "...",
          "technologies": "...",
          "period": "...",
          "descriptions": [
            {
              "id": 1,
              "description": "..."
            }
          ]
        }
      ],
      "languages": [
        {
          "id": 1,
          "language": "Português",
          "level": "Nativo"
        }
      ],
      "skills": {
        "id": 1,
        "skillBackend": [{ "id": 1, "name": "Node.js" }],
        "skillFrontend": [{ "id": 2, "name": "React" }],
        "skillDatabase": [{ "id": 3, "name": "PostgreSQL" }],
        "skillTool": [{ "id": 4, "name": "Docker" }],
        "skillMethodology": [{ "id": 5, "name": "Scrum" }]
      }
    }
  ]
}
```

### Mapper recomendado para resume

Arquivo sugerido:

- `src/types/mapper/resume-directus.mapper.ts`

Responsabilidade:

- converter o payload do Directus para `PersonalInfo` de `src/types/perosnal-info.type.ts`

Entrada:

- `ResumeDirectusItem`

Saída:

- `PersonalInfo`

### Tipo sugerido

```ts
export interface ResumeDirectusResponse {
  data: ResumeDirectusItem[];
}

export interface ResumeDirectusItem {
  id: number;
  name: string;
  title: string;
  avatar_url: string;
  location: string;
  slug: string;
  summary: string;
  contact: ResumeContact;
  education: ResumeEducation[];
  certification: ResumeCertification[];
  experience: ResumeExperience[];
  languages: ResumeLanguage[];
  skills: ResumeSkills;
}
```

## Domínio 5: Setup

O setup já está praticamente migrado para Directus.

### O que já existe

Tipos:

- `src/types/setup_page_directus.type.ts`
- `src/types/mapper/setup.mapper.ts`

Collection principal observada:

- `setup`

Collection relacionada:

- `setup_items`

### JSON atual já esperado

```json
{
  "data": {
    "id": 1,
    "slug": "setup",
    "title": "Meu Setup",
    "setup_items": [
      {
        "id": 10,
        "setup_id": 1,
        "setup_items_id": {
          "id": 100,
          "name": "Microfone",
          "price": 299.9,
          "productUrl": "https://...",
          "imageUrl": "https://...",
          "slug": "microfone-x",
          "nameFull": "Microfone X"
        }
      }
    ]
  }
}
```

Conclusão:

- esse domínio é o melhor exemplo para seguir na migração dos demais.

## Domínio 6: Sitemap

Hoje o sitemap usa Prisma para:

- `setup.findMany()`
- `post.findMany()`

### Substituição recomendada

Usar Directus para buscar apenas slugs.

Collections:

- `setup_items` ou a collection que representa item navegável final
- `post`

### JSON esperado para sitemap

Posts:

```json
{
  "data": [
    { "id": 1, "slug": "post-a", "date_created": "2026-04-03T00:00:00.000Z" }
  ]
}
```

Setup:

```json
{
  "data": [
    { "id": 10, "slug": "microfone-x", "date_created": "2026-04-03T00:00:00.000Z" }
  ]
}
```

### Tipo sugerido

```ts
export interface SlugListDirectusResponse {
  data: {
    id: number;
    slug: string;
    date_created?: string;
  }[];
}
```

Mapper:

- desnecessário;
- basta mapear direto para `MetadataRoute.Sitemap`.

## Mappers Recomendados

### 1. `post-directus.mapper.ts`

Entrada:

- `PostData`

Saída:

- `PostType`

Uso previsto:

- `/blog/[slug]`
- fallback de componentes legados que ainda esperam `PostType`

### 2. `resume-directus.mapper.ts`

Entrada:

- `ResumeDirectusItem`

Saída:

- `PersonalInfo`

Uso previsto:

- `/resume/[slug]`

### 3. `video.mapper.ts`

Entrada:

- `VideoDirectusItem`

Saída:

- `VideoProps`

Uso previsto:

- `/videos`

### 4. `ticker-post.mapper.ts`

Entrada:

- item simples de `post`

Saída:

- `{ title: string; slug: string }`

Uso previsto:

- home ticker

Observação:

- esse mapper pode ser opcional; talvez nem valha criar arquivo separado.

## Collections Novas ou Ajustes Necessários no Directus

### Já existentes e aproveitáveis

- `post`
- `blog`
- `author`
- `social_media`
- `setup`
- `setup_items`
- `shorts`
- `consult`
- `technologies`
- `global`
- `bymycoffe`

### Precisam ser criadas para remover Prisma

- `videos`
- `resume`
- `resume_contact`
- `resume_education`
- `resume_certification`
- `resume_experience`
- `resume_experience_description`
- `resume_language`

### Podem ser criadas ou substituídas por JSON

- `resume_skill_group`
- `resume_skill_backend`
- `resume_skill_frontend`
- `resume_skill_database`
- `resume_skill_tool`
- `resume_skill_methodology`

## Ordem Recomendada de Modelagem no Directus

1. completar `post` para substituir 100% o legado Prisma do blog
2. criar `videos`
3. criar `resume` e relações
4. ajustar endpoints mínimos para `sitemap`
5. remover imports e mappers acoplados ao Prisma

## Checklist por domínio

### Posts

- collection `post` com todos os campos necessários
- relação com `author`
- relação com `social_media`
- relação com `blog`
- mapper de `PostData` para `PostType`

### Videos

- collection `videos`
- tipo `VideoDirectusResponse`
- troca de `prisma.videos.findMany()`

### Resume

- collection principal `resume`
- subcollections relacionais
- tipo `ResumeDirectusResponse`
- mapper `resume-directus.mapper.ts`

### Sitemap

- endpoint minimalista só com `slug`
- troca de `prisma.setup.findMany()` e `prisma.post.findMany()`

## Conclusão

O caminho mais simples de migração é:

- usar `setup` como referência arquitetural;
- consolidar `post` como a primeira substituição completa;
- modelar `videos` como collection simples;
- modelar `resume` com relações ou JSON híbrido;
- centralizar diferenças de payload em mappers, e não no schema do Directus.

Se você quiser, no próximo passo eu posso transformar esse documento em uma tabela “collection por collection” com campos exatos sugeridos para você copiar no Directus. 

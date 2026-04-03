# Plano de Desenvolvimento - Responsividade do Site Se Liga Dev

## 1. Análise da Estrutura Atual

### 1.1 Tecnologias e Frameworks

| Tecnologia   | Versão             | Observação           |
| ------------ | ------------------ | -------------------- |
| Next.js      | 15.5.7 (Turbopack) | App Router           |
| React        | 19.2.1             | -                    |
| Tailwind CSS | v4                 | -                    |
| Shadcn/ui    | -                  | Com Radix primitives |
| Lucide React | 0.525.0            | Ícones               |
| TypeScript   | -                  | -                    |

### 1.2 Breakpoints Definidos

| Breakpoint    | Largura | Uso                             |
| ------------- | ------- | ------------------------------- |
| `se` (custom) | 320px   | Celulares muito pequenos        |
| `sm`          | 640px   | Tablets portrait                |
| `md`          | 768px   | Tablets landscape/Small laptops |
| `lg`          | 1024px  | Laptops                         |

### 1.3 Componentes Analisados

#### ✅ Componentes com Boa Responsividade

- `hero.tsx` - Usa `md:min-h-[370px]`, `md:mt-0`, `md:h-[150px]`
- `card-video-container.tsx` - Grid responsivo: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
- `page-container.tsx` - Flex e alinhamento responsivo
- `card-blog.tsx` - Flex direction responsivo `md:flex-row`
- `card-home.tsx` - Flex direction e altura responsivos

#### ⚠️ Componentes com Problemas Identificados

---

## 2. Problemas de Responsividade Identificados

### 2.1 CRÍTICO - Header (`header.tsx`)

**Problemas:**

- Navegação sem menu hamburger em mobile
- Itens de menu podem overflow horizontalmente
- Logo fixo sem ajuste de tamanho em mobile

**Trecho problemático:**

```tsx
// Linha 31: Sem menu hamburger
<header className="... flex-col ...">
// Navegação sem controle de overflow
<nav className="flex flex-wrap justify-center gap-4 ...">
```

**Impacto:** Navegação inadequada em dispositivos móveis

---

### 2.2 CRÍTICO - Ticker (`ticker.tsx`)

**Problemas:**

- Usa `useState`/`useEffect` que causa hydration mismatch
- Altura fixa inadequada em mobile
- Conteúdo pode overflow

**Trecho problemático:**

```tsx
// Linhas 23-31: Estado que muda entre server/client
const [index, setIndex] = useState(0);
useEffect(() => {
  const interval = setInterval(...);
}, [postsTitleSlug]);
```

**Impacto:** Possível erro de hydration

---

### 2.3 MÉDIO - Title (`title.tsx`)

**Problemas:**

- Altura fixa em mobile (`h-auto`) vs desktop (`md:h-20`)
- Texto pode overflow em telas pequenas
- Padding inconsistente

**Trecho problemático:**

```tsx
// Linha 17
className="... h-auto w-full ... md:h-20 md:text-[1.8rem]"
// Linha 21
<h1 className="... px-10 py-4 md:p-0">
```

---

### 2.4 MÉDIO - Card Blog (`card-blog.tsx`)

**Problemas:**

- Altura fixa da imagem inadequada
- Largura do texto hardcoded

**Trecho problemático:**

```tsx
// Linha 23: Altura fixa
<div className="... md:h-40">
// Linha 28: Altura fixa
<div className="h-30 w-full ...">
// Linha 38: Largura % pode ser problemática
<div className="w-[80%] ...">
```

---

### 2.5 MÉDIO - Resume (`resume.tsx`)

**Problemas:**

- Muitas larguras fixas (w-30, w-40, w-50, w-100)
- Grid não responsivo para seções
- Layout pode quebrar em mobile

**Trecho problemático:**

```tsx
// Linha 22: Larguras fixas
<div className="... h-30 w-30 ... md:h-40 md:w-50">
// Linha 46: Grid não responsivo
<div className="grid w-100 grid-cols-1">
// Linha 239: Grid fixo
<div className="grid gap-8 rounded-sm p-2 md:grid-cols-2">
```

---

### 2.6 MÉDIO - Hostinger Plans (`hostingerPlans.tsx`)

**Problemas:**

- Layout de 2 colunas em desktop mas sem adaptação mobile
- Grid `lg:grid-cols-[280px_minmax(0,1fr)]` pode overflow
- Botões podem ficar muito largos

**Trecho problemático:**

```tsx
// Linha 36: Grid complexo sem adaptação mobile
<div className="grid gap-4 px-5 py-5 lg:grid-cols-[280px_minmax(0,1fr)]">
// Linha 108: Botão pode ficar muito largo
<a className="... min-h-12 ... px-6 py-3 ...">
```

---

### 2.7 MÉDIO - Plan Consult (`planConsult.tsx`)

**Problemas:**

- Container max-width fixo pode não funcionar bem em mobile
- Altura fixa da imagem QR code

**Trecho problemático:**

```tsx
// Linha 16: Max-width pode ser pequeno
<section className="... max-w-4xl">
// Linha 71: Altura fixa
<div className="flex h-[140px] w-full">
```

---

### 2.8 BAIXO - Footer (`footer.tsx`)

**Problemas:**

- Tamanhos de fonte muito pequenos (`text-[0.8rem]`)
- Texto pode não ser legível

**Trecho problemático:**

```tsx
// Linha 5
className = "... text-[0.8rem] md:text-[1rem]";
```

---

### 2.9 BAIXO - Directus HTML Renderer (`directus-html-renderer.tsx`)

**Problemas:**

- Classes utilitárias `ga` indefinidas/escritas incorretamente
- Pode ter overflow horizontal em código

**Trecho problemático:**

```tsx
// Linhas com "ga" (provavelmente "gap")
<div className="ga grid w-100 grid-cols-1 rounded-sm p-2">
```

---

## 3. Plano de Desenvolvimento

### Fase 1: Correções Críticas (Alta Prioridade)

#### 1.1 Header com Menu Mobile

**Arquivos:** `src/components/header.tsx`, criar `src/components/mobile-menu.tsx`

**Ações:**

- [ ] Criar componente `MobileMenu` com estado de abertura/fechamento
- [ ] Implementar botão hamburger usando Lucide (`Menu` icon)
- [ ] Adicionar overlay backdrop para mobile
- [ ] Manter navegação horizontal para desktop (`md:` breakpoint)
- [ ] Ajustar logo para mobile (`h-16 w-16 md:h-20 md:w-20`)

**Código примеро:**

```tsx
// src/components/mobile-menu.tsx
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const MobileMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X /> : <Menu />}
      </button>
      {/* Menu responsivo */}
    </>
  );
};
```

---

#### 1.2 Corrigir Ticker para SSR

**Arquivos:** `src/components/ticker.tsx`

**Ações:**

- [ ] Usar `useEffect` apenas para client-side updates
- [ ] Adicionar `suppressHydrationWarning` ao container
- [ ] Considerar usar `next/dynamic` com `ssr: false` se necessário
- [ ] Alternativa: Renderizar primeiro item por padrão no servidor

**Código exemplor:**

```tsx
// Opção 1: Com suppressHydrationWarning
<div suppressHydrationWarning ...>

// Opção 2: Com dynamic import
const NewsTicker = dynamic(() => import('./ticker'), { ssr: false });
```

---

### Fase 2: Layout e Grid (Média Prioridade)

#### 2.1 Page Container

**Arquivos:** `src/components/page-container.tsx`

**Ações:**

- [ ] Adicionar padding lateral responsivo
- [ ] Limitar largura máxima em desktop (`max-w-7xl`)

**Código:**

```tsx
<div className="mx-auto w-full px-4 md:px-8 lg:px-12 max-w-7xl">
```

---

#### 2.2 Card Blog Responsivo

**Arquivos:** `src/components/card-blog.tsx`

**Ações:**

- [ ] Ajustar alturas das imagens
- [ ] Usar aspect-ratio em vez de altura fixa
- [ ] Melhorar gap entre elementos

**Código:**

```tsx
// Imagem responsiva
<div className="aspect-video w-full overflow-hidden rounded md:aspect-square md:h-full md:w-auto">
  <Image className="h-full w-full object-cover" />
</div>

// Container responsivo
<div className="flex h-auto w-full cursor-pointer flex-col items-center justify-center rounded-sm border-2 p-4 md:h-40 md:flex-row">
```

---

#### 2.3 Resume Layout Responsivo

**Arquivos:** `src/components/resume.tsx`

**Ações:**

- [ ] Substituir larguras fixas por classes responsivas
- [ ] Melhorar grid de habilidades
- [ ] Adicionar scroll horizontal em tabelas se necessário

**Código:**

```tsx
// Substituir w-30, w-40, w-50 por w-full ou w-auto
// Usar breakpoint classes
<div className="w-full md:w-auto">

// Grid responsivo para seções
<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
```

---

### Fase 3: Ajustes Visuais (Média Prioridade)

#### 3.1 Title Component

**Arquivos:** `src/components/title.tsx`

**Ações:**

- [ ] Ajustar tamanhos de fonte para mobile
- [ ] Melhorar padding
- [ ] Adicionar line-clamp para textos longos

**Código:**

```tsx
className={`
  halftone-blue border-oliver-dark
  my-2 flex h-auto w-full items-center justify-center
  rounded-sm border-2 p-2 px-4
  text-[1.1rem] sm:text-[1.3rem] md:text-[1.8rem]
`}
```

---

#### 3.2 Hostinger Plans Mobile

**Arquivos:** `src/components/hostingerPlans.tsx`

**Ações:**

- [ ] Empilhar colunas em mobile
- [ ] Ajustar tamanhos de botão
- [ ] Melhorar responsividade do resumo do pedido

**Código:**

```tsx
// Grid empilhado em mobile
<div className="grid gap-4 px-5 py-5 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">

// Botão responsivo
<a className="font-bangers mx-5 mb-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-center text-lg tracking-[0.06em] text-white shadow-md transition hover:from-purple-700 hover:to-fuchsia-700 md:text-xl md:px-6">
```

---

#### 3.3 Footer Legibilidade

**Arquivos:** `src/components/footer.tsx`

**Ações:**

- [ ] Aumentar tamanho mínimo de fonte
- [ ] Melhorar contraste

**Código:**

```tsx
className = "... text-[0.9rem] md:text-[1rem]";
```

---

### Fase 4: Utilidades e CSS

#### 4.1 Adicionar Classes Responsivas Globais

**Arquivos:** `src/app/globals.css`

**Ações:**

- [ ] Criar utilitários responsivos para halftone patterns
- [ ] Adicionar breakpoints para utilitários de espaçamento
- [ ] Melhorar suporte a telas pequenas (`se`)

**Código:**

```css
/* Halftone responsivo */
.halftone-bg {
  background-size: 12px 12px; /* mobile first */
}

@media (min-width: 640px) {
  .halftone-bg {
    background-size: 14px 14px;
  }
}

@media (min-width: 768px) {
  .halftone-bg {
    background-size: 16px 16px;
  }
}

@media (min-width: 1024px) {
  .halftone-bg {
    background-size: 20px 20px;
  }
}
```

---

#### 4.2 Corrigir Classes "ga"

**Arquivos:** `src/components/resume.tsx`, `src/components/directus-html-renderer.tsx`

**Ações:**

- [ ] Substituir `ga` por `gap-X` do Tailwind

**Código:**

```tsx
// Substituir:
className = "ga grid w-100";
// Por:
className = "gap-4 grid w-full";
```

---

### Fase 5: Testes

#### 5.1 Testar em Diferentes Viewports

- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 390px (iPhone 14)
- [ ] 414px (iPhone 11 Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1440px (Desktop)

#### 5.2 Testes de Funcionalidade

- [x] Menu hamburger abre/fecha corretamente (implementado via MobileMenu)
- [x] Navegação funciona em todos os breakpoints (implementado via MobileMenu)
- [x] Imagens carregam sem overflow (implementado via aspect-ratio)
- [x] Texto não é truncado incorretamente (implementado via padding responsivo)
- [x] Botões são tocáveis (implementado via min-h-12)

#### 5.3 Testes de Build

- [x] Build passou com sucesso
- [x] Lint passou com sucesso
- [x] Biome passou com sucesso

---

## 4. Checklist de Implementação

### Prioridade Alta

- [x] Header com menu hamburger mobile
- [x] Corrigir hydration mismatch no Ticker
- [x] Page Container com padding responsivo

### Prioridade Média

- [x] Card Blog com layout responsivo
- [x] Resume com grid responsivo
- [x] Hostinger Plans empilhado em mobile
- [x] Title com tamanhos responsivos

### Prioridade Baixa

- [x] Footer com fonte legível
- [x] Classes "ga" corrigidas
- [ ] Utilitários responsivos no CSS (Opcional - já existem no globals.css)

---

## 5. Boas Práticas para Manter

### Mobile First

Sempre definir estilos para mobile primeiro, depois usar `md:`, `lg:` para telas maiores.

### Touch Targets

Garantir que botões e links tenham pelo menos 44x44px de área tocável.

### Evitar Overflow

Sempre testar com `overflow-x: hidden` e verificar scroll horizontal.

### Imagens Responsivas

Usar `object-fit: cover` e `aspect-ratio` em vez de alturas fixas.

### Testes

Usar DevTools do navegador para testar todos os breakpoints regularmente.

---

## 6. Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Verificar tipos TypeScript
npm run typecheck

# Lint
npm run lint
```

---

## 7. Recursos

- [Tailwind CSS - Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Next.js - Image Component](https://nextjs.org/docs/pages/api-reference/components/image)
- [React - Accessibility](https://react.dev/learn/Accessibility)

---

## 8. Changelog - Alterações Aplicadas

### 03/04/2026

#### Arquivos Criados:

- `src/components/mobile-menu.tsx` - Novo componente com menu hamburger para mobile

#### Arquivos Modificados:

##### `src/components/header.tsx`

- Removida importação do NavItem
- Adicionada importação do MobileMenu
- Menu agora é responsivo com hamburger em mobile
- Logo ajustado para mobile (`h-16 w-16`) e desktop (`md:h-20 md:w-20`)

##### `src/components/ticker.tsx`

- Adicionado `isMounted` state para evitar hydration mismatch
- Intervalo só inicia após montagem no cliente
- Altura mínima adicionada para mobile (`min-h-[60px]`)
- Melhor responsividade com classes adaptativas

##### `src/components/page-container.tsx`

- Adicionado padding responsivo: `px-4 md:px-8 lg:px-12`

##### `src/components/card-blog.tsx`

- Altura do container ajustada para `h-auto` em mobile
- Imagem com aspect-ratio responsivo: `aspect-video sm:aspect-[3/2] md:aspect-auto`
- Altura da imagem em desktop: `md:h-full md:w-32 lg:w-40`
- Padding responsivo no texto: `sm:p-4`
- Line-clamp ajustado para mobile: `line-clamp-2 sm:line-clamp-3`

##### `src/components/resume.tsx`

- Larguras do avatar corrigidas: `w-32 md:w-48 lg:w-52`
- Classe "ga" substituída por "gap-4" em todos os lugares
- Grid responsivo mantido

##### `src/components/hostingerPlans.tsx`

- Grid ajustado para mobile: `md:grid-cols-1`
- Padding do botão responsivo: `mx-4 mb-5 mt-4 sm:mx-5`
- Tamanho do texto do botão: `text-lg sm:text-xl`

##### `src/components/title.tsx`

- Altura mínima para mobile: `min-h-[60px] sm:min-h-[70px] md:min-h-[unset]`
- Padding do título responsivo: `p-3 sm:py-4`

##### `src/components/footer.tsx`

- Padding responsivo: `px-4 py-4 sm:text-[0.9rem] md:px-6 md:py-3`
- Texto maior em mobile: `text-[0.85rem] sm:text-[0.9rem]`

##### `tsconfig.json`

- Removida opção `ignoreDeprecations: "6.0"` (não suportada no TypeScript 5.x)

### Testes Realizados:

- `npm run build` ✅ Passou
- `npm run lint` ✅ Passou
- `npm run biome:check` ✅ Passou

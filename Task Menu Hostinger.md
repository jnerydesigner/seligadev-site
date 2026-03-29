Deixar menu da página Hostinger em evidência:

1. Adicionar a página `/hostinger` na lista de itens do menu em [`/home/jander-nery/Projetos/seligadev/src/components/header.tsx`](/home/jander-nery/Projetos/seligadev/src/components/header.tsx)
2. Garantir que o item "Hostinger" fique visível junto dos demais links principais do header
3. Validar que o destaque visual de item ativo funcione na rota `/hostinger`
4. Confirmar que o comportamento continue funcionando no desktop e no mobile

Contexto:

- Hoje o header já possui lógica de item ativo com `isActivePath`
- O destaque visual já existe em [`/home/jander-nery/Projetos/seligadev/src/components/nav-item.tsx`](/home/jander-nery/Projetos/seligadev/src/components/nav-item.tsx)
- A página Hostinger existe em [`/home/jander-nery/Projetos/seligadev/src/app/hostinger/page.tsx`](/home/jander-nery/Projetos/seligadev/src/app/hostinger/page.tsx), mas não aparece no menu principal

Critério de aceite:

1. O menu exibe o link "Hostinger"
2. Ao acessar `/hostinger`, o item correspondente fica destacado
3. O menu não quebra visualmente com o novo item

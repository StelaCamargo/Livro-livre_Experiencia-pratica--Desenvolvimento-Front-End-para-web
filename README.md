# Livro Livre — SPA

Plataforma da ONG Livro Livre (Experiência Prática III).

## Como abrir
O JavaScript usa ES Modules (`import`/`export`), então o site precisa de um servidor local:
abra a pasta no VS Code e use a extensão **Live Server** em `html/index.html`.
(Abrir o arquivo com dois cliques não funciona por causa da segurança do navegador.)

## Estrutura
- `html/` — `index.html`, a única página da SPA (casca com cabeçalho, `<main>` e rodapé)
- `css/` — `reset.css` (normalização) e `estilo.css` (design system e componentes)
- `imagens/` — imagens do site (JPG, usada no site, e PNG, cópia em alta qualidade)
- `js/main.js` — ponto de entrada: define as rotas e inicia a aplicação
- `js/modules/` — um arquivo por responsabilidade:
  `router.js`, `templates.js`, `dados.js`, `validacao.js`, `formulario.js`,
  `armazenamento.js`, `projetos.js`, `voluntarios.js`, `ui.js`

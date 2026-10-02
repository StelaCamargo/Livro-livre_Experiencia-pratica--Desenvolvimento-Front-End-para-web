# Livro Livre

Plataforma web da **Livro Livre**, uma ONG (fictícia) que monta bibliotecas comunitárias e rodas de leitura na zona leste de São Paulo. O site apresenta os projetos da organização e permite o cadastro de voluntários.

Projeto desenvolvido nas Experiências Práticas da disciplina de **Desenvolvimento Front-End para Web**.

🔗 **Site no ar:** https://stelacamargo.github.io/Livro-livre_Experiencia-pratica--Desenvolvimento-Front-End-para-web/

---

## Funcionalidades

- **Single Page Application (SPA):** navegação por `#hash`, sem recarregar a página.
- **Templates em JavaScript:** cards, listas e opções do formulário gerados a partir dos dados.
- **Cadastro de voluntários** com máscaras (CPF, telefone, CEP) e validação com mensagens de erro.
- **localStorage:** os cadastros e o rascunho do formulário ficam salvos no navegador.
- **Lista de voluntários** com opção de remover cadastros.
- **Filtro de projetos** por categoria.
- **Gráfico de resultados** com a biblioteca Chart.js.
- **Componentes de feedback:** alertas, badges, toast e modal.
- **Layout responsivo** (mobile-first) com menu hambúrguer e submenu.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid de 12 colunas, Flexbox, media queries)
- JavaScript (ES6 Modules, sem frameworks)
- [Chart.js](https://www.chartjs.org/) via CDN
- Git e GitHub, com publicação pelo GitHub Pages

## Como rodar localmente

O JavaScript usa ES Modules (`import`/`export`), então o site precisa ser aberto por um servidor local. Abrir o arquivo com dois cliques não funciona por segurança do navegador.

1. Clone o repositório:
   ```
   git clone https://github.com/StelaCamargo/Livro-livre_Experiencia-pratica--Desenvolvimento-Front-End-para-web.git
   ```
2. Abra a pasta no **VS Code**.
3. Instale a extensão **Live Server**.
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## Estrutura de pastas

```
├── index.html          → redireciona para html/index.html
├── html/
│   └── index.html      → única página da SPA (cabeçalho, <main> e rodapé)
├── css/
│   ├── reset.css       → normalização entre navegadores
│   └── estilo.css      → design system, grid, componentes e responsividade
├── imagens/
│   ├── biblioteca.jpg  → imagem usada no site
│   └── biblioteca.png  → cópia em alta qualidade
└── js/
    ├── main.js         → ponto de entrada: rotas e inicialização
    └── modules/
        ├── router.js        → navegação por hash
        ├── templates.js     → HTML de cada tela
        ├── dados.js         → dados dos projetos
        ├── validacao.js     → máscaras e regras do formulário
        ├── formulario.js    → comportamento do cadastro
        ├── armazenamento.js → único acesso ao localStorage
        ├── projetos.js      → filtros e gráfico
        ├── voluntarios.js   → lista de voluntários
        ├── grafico.js       → integração com o Chart.js
        └── ui.js            → menu, toast, modal e utilitários
```

## Acessibilidade

O projeto segue as diretrizes da **WCAG 2.1, nível AA**:

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`), sem `div`.
- Link **"Pular para o conteúdo"**.
- Navegação completa pelo teclado, com foco sempre visível.
- Contraste de cores de pelo menos 4,5:1 nos textos.
- Campos com `label`, mensagens de erro ligadas por `aria-describedby` e `aria-invalid`.
- Erros indicados por cor, ícone e texto, não só pela cor.
- Menu com `aria-expanded` e página atual marcada com `aria-current`.
- Troca de página anunciada para leitores de tela (`aria-live`) e foco levado ao título da nova tela.
- Respeito à preferência de reduzir animações (`prefers-reduced-motion`).

## Fluxo de trabalho (GitFlow)

- `main` → versões estáveis publicadas no GitHub Pages.
- `develop` → integração do desenvolvimento.
- `feature/...` → cada nova funcionalidade, criada a partir da `develop`.
- `hotfix/...` → correções urgentes, criadas a partir da `main`.

As mensagens de commit seguem o padrão **Conventional Commits** (`feat:`, `fix:`, `style:`, `docs:`).

## Autora

**Stela de Camargo dos Santos Cruz**
Análise e Desenvolvimento de Sistemas

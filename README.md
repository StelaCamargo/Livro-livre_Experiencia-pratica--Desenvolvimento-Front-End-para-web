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
- **Modo escuro e alto contraste**, com a escolha salva no navegador.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid de 12 colunas, Flexbox, media queries)
- JavaScript (ES6 Modules, sem frameworks)
- [Chart.js](https://www.chartjs.org/) 4.4.1 via CDN
- Git e GitHub, com publicação pelo GitHub Pages

## Pré-requisitos

- Um navegador atualizado (Chrome, Edge, Firefox ou Safari).
- [Git](https://git-scm.com/) para clonar o repositório.
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** (ou qualquer outro servidor local).
- Conexão com a internet para carregar o Chart.js pelo CDN. Sem internet, o site funciona normalmente e só o gráfico fica escondido.

## Instalação

O projeto **não tem dependências para instalar** (não usa npm). A única biblioteca externa, o Chart.js, é carregada por CDN.

1. Clone o repositório:
   ```
   git clone https://github.com/StelaCamargo/Livro-livre_Experiencia-pratica--Desenvolvimento-Front-End-para-web.git
   ```
2. Abra a pasta no **VS Code**.

## Como executar

O JavaScript usa ES Modules (`import`/`export`), então o site precisa ser aberto por um servidor local. Abrir o arquivo com dois cliques não funciona por segurança do navegador.

1. Clique com o botão direito em `index.html` (na raiz).
2. Escolha **Open with Live Server**.
3. O site abre no navegador e redireciona para `html/index.html`.

## Build para produção

Não há etapa de build obrigatória. Para deixar o site mais leve em produção:

- `css/reset.css` e `css/estilo.css` foram juntados e **minificados** em `css/estilo.min.css` (de 28 KB para 21 KB). É esse arquivo que o `html/index.html` carrega.
- A imagem principal (`imagens/biblioteca.jpg`) foi **comprimida** (de 210 KB para 173 KB).

Ao editar o CSS, altere sempre `reset.css` ou `estilo.css` (arquivos legíveis) e gere de novo o `estilo.min.css`, juntando os dois arquivos em um minificador de CSS.

## Testes

O projeto não tem testes automatizados. Antes de cada versão, é feito este roteiro de **testes manuais** no navegador, com o DevTools (F12):

- Navegação por todas as rotas, botões voltar/avançar e página 404.
- Formulário com dados inválidos (CPF, e-mail, telefone, idade) e com dados válidos.
- Cadastro salvo no localStorage, lista de voluntários e remoção.
- Layout no modo celular (Ctrl + Shift + M) e no desktop.
- Uso só com teclado (Tab, Enter, Esc) e console sem erros.
- Site sem internet (aba Network → Offline): o gráfico é escondido e o resto funciona.

## Estrutura de pastas

```
├── index.html          → redireciona para html/index.html
├── html/
│   └── index.html      → única página da SPA (cabeçalho, <main> e rodapé)
├── css/
│   ├── reset.css       → normalização entre navegadores
│   ├── estilo.css      → design system, grid, componentes e responsividade
│   └── estilo.min.css  → reset.css + estilo.css minificados (usado em produção)
├── imagens/
│   ├── biblioteca.jpg  → imagem usada no site (comprimida)
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
        ├── tema.js          → modos de cor (claro, escuro, alto contraste)
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
- **Temas de cor:** claro, escuro e alto contraste, escolhidos no rodapé ("Tema de cores"). No modo automático, o site segue o sistema (`prefers-color-scheme` e `prefers-contrast`). A escolha fica salva no localStorage.

## Fluxo de trabalho (GitFlow)

- `main` → versões estáveis publicadas no GitHub Pages.
- `develop` → integração do desenvolvimento.
- `feature/...` → cada nova funcionalidade, criada a partir da `develop`.
- `hotfix/...` → correções urgentes, criadas a partir da `main`.

As mensagens de commit seguem o padrão **Conventional Commits** (`feat:`, `fix:`, `style:`, `docs:`, `perf:`). As versões seguem o **versionamento semântico** e são marcadas com tags (`v1.0.0`, `v1.1.0`...).

## Autora

**Stela de Camargo dos Santos**
Análise e Desenvolvimento de Sistemas

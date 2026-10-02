/* router.js — navegação da SPA por #hash.
   Troca o conteúdo do <main> sem recarregar a página. */

import { marcarMenu, fecharMenu } from './ui.js';

let rotas = {};
let app;
let primeiraCarga = true;

/* lê o hash: "#/projetos/roda-leitura" -> { nome: 'projetos', parametro: 'roda-leitura' } */
function lerHash() {
  const [nome = 'inicio', parametro = ''] = location.hash.replace(/^#\/?/, '').split('/');
  return { nome: nome || 'inicio', parametro };
}

function desenhar() {
  // links internos que não são rotas (ex.: âncoras comuns) são ignorados
  if (location.hash && !location.hash.startsWith('#/')) return;

  const { nome, parametro } = lerHash();
  const rota = rotas[nome] || rotas['404'];

  // 1. monta o HTML da tela a partir do template
  app.innerHTML = `<article class="pagina">${rota.template(parametro)}</article>`;

  // 2. atualiza título da aba, menu e fecha o menu mobile
  document.title = `${rota.titulo} | Livro Livre`;
  marcarMenu(rotas[nome] ? nome : '');
  fecharMenu();

  // 3. liga os eventos específicos da tela (formulário, filtros, botões...)
  // (os eventos ficam presos ao <article> novo, então somem junto com a tela antiga)
  const pagina = app.querySelector('.pagina');
  const rolouParaItem = rota.montar ? rota.montar(pagina, parametro) : false;

  // 4. acessibilidade: leva o foco para o título da nova tela
  if (!rolouParaItem) {
    window.scrollTo({ top: 0 });
    if (!primeiraCarga) pagina.querySelector('h1')?.focus({ preventScroll: true });
  }
  primeiraCarga = false;
}

export function iniciarRouter(tabelaDeRotas) {
  rotas = tabelaDeRotas;
  app = document.getElementById('conteudo');
  if (!location.hash) history.replaceState(null, '', '#/inicio');
  window.addEventListener('hashchange', desenhar);
  desenhar();
}

/* permite redesenhar a tela atual (ex.: depois de apagar um cadastro) */
export function recarregarRota() {
  desenhar();
}

/* ui.js — componentes de interface reutilizáveis:
   menu responsivo, toast, modal e utilitários de segurança. */

/* evita que texto digitado pelo usuário vire HTML (proteção contra XSS) */
export function escaparHTML(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- menu hambúrguer ---------- */
let botaoMenu;
let listaMenu;

export function fecharMenu() {
  if (!botaoMenu) return;
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.textContent = 'Menu';
  listaMenu.classList.remove('aberto');
}

export function iniciarMenu() {
  botaoMenu = document.querySelector('.menu__botao');
  listaMenu = document.getElementById('menu-principal');
  if (!botaoMenu || !listaMenu) return;

  botaoMenu.addEventListener('click', () => {
    const abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    botaoMenu.textContent = abrir ? 'Fechar' : 'Menu';
    listaMenu.classList.toggle('aberto', abrir);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
      fecharMenu();
      botaoMenu.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (m) => {
    if (m.matches) fecharMenu();
  });
}

/* marca o link da página atual no menu */
export function marcarMenu(rota) {
  document.querySelectorAll('.menu__link').forEach((link) => {
    if (link.dataset.rota === rota) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/* o link "Pular para o conteúdo" não pode mudar o #hash (isso trocaria de rota) */
export function iniciarLinkPular() {
  const link = document.querySelector('.pular');
  const main = document.getElementById('conteudo');
  if (!link || !main) return;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    main.focus();
  });
}

/* ---------- toast ---------- */
let toast;
let timerToast;

export function mostrarToast(texto, tipo = '') {
  if (!toast) {
    toast = document.createElement('section');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<p class="toast__texto"></p>' +
      '<button class="toast__fechar" type="button" aria-label="Fechar notificação">✕</button>';
    document.body.appendChild(toast);
    toast.querySelector('.toast__fechar').addEventListener('click', esconderToast);
  }
  toast.className = 'toast' + (tipo ? ' toast--' + tipo : '');
  toast.querySelector('.toast__texto').textContent = texto;
  requestAnimationFrame(() => toast.classList.add('visivel'));
  clearTimeout(timerToast);
  timerToast = setTimeout(esconderToast, 5000);
}

function esconderToast() {
  if (toast) toast.classList.remove('visivel');
}

/* ---------- modal ---------- */
export function abrirModal({ titulo, texto, botao = 'Entendi', aoFechar } = {}) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.querySelector('#modal-titulo').textContent = titulo;
  modal.querySelector('#modal-texto').textContent = texto;
  modal.querySelector('.modal__acoes .btn').textContent = botao;
  if (aoFechar) modal.addEventListener('close', aoFechar, { once: true });
  modal.showModal();
}

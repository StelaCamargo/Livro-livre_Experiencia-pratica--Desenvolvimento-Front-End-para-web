/* projetos.js — filtros por categoria e destaque do projeto vindo do submenu */

import { projetos } from './dados.js';
import { listaDeCards } from './templates.js';
import { desenharGrafico } from './grafico.js';

export function montarProjetos(raiz, idProjeto) {
  const lista = raiz.querySelector('#lista-projetos');

  // gráfico de resultados com a biblioteca externa Chart.js
  desenharGrafico(raiz.querySelector('#grafico-resultados'), projetos);

  raiz.querySelectorAll('[data-filtro]').forEach((botao) => {
    botao.addEventListener('click', () => {
      const categoria = botao.dataset.filtro;
      raiz.querySelectorAll('[data-filtro]').forEach((b) =>
        b.setAttribute('aria-pressed', String(b === botao)));
      const filtrados = categoria === 'todos'
        ? projetos
        : projetos.filter((p) => p.categoria === categoria);
      lista.innerHTML = listaDeCards(filtrados);
    });
  });

  // veio de "#/projetos/roda-leitura": rola até o card e destaca
  if (idProjeto) {
    const titulo = raiz.querySelector(`#${CSS.escape(idProjeto)}`);
    if (titulo) {
      const card = titulo.closest('.card');
      card.classList.add('card--foco');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      titulo.focus({ preventScroll: true });
      return true; // avisa o roteador que já cuidamos do scroll
    }
  }
  return false;
}

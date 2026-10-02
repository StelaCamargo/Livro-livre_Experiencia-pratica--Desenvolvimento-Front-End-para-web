/* voluntarios.js — tela que lista os cadastros salvos no localStorage */

import { removerVoluntario, limparVoluntarios, listarVoluntarios } from './armazenamento.js';
import { mostrarToast } from './ui.js';
import { recarregarRota } from './router.js';

export function montarVoluntarios(raiz) {
  // delegação de eventos: um único ouvinte para todos os botões da lista
  raiz.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-acao]');
    if (!botao) return;

    if (botao.dataset.acao === 'remover') {
      const v = listarVoluntarios().find((item) => item.id === botao.dataset.id);
      removerVoluntario(botao.dataset.id);
      mostrarToast(`Cadastro de ${v ? v.nome.split(' ')[0] : 'voluntário'} removido.`);
      recarregarRota();
    }

    if (botao.dataset.acao === 'limpar') {
      if (!window.confirm('Apagar todos os cadastros salvos neste navegador?')) return;
      limparVoluntarios();
      mostrarToast('Todos os cadastros foram apagados.');
      recarregarRota();
    }
  });
}

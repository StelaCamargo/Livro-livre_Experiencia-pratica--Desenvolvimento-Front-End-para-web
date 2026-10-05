/* tema.js — modos de cor (claro, escuro e alto contraste).
   As cores ficam só no CSS (tokens em :root). Aqui o JS apenas
   coloca ou tira o atributo data-tema no <html> e salva a escolha. */

import { lerTema, salvarTema } from './armazenamento.js';
import { atualizarCoresGrafico } from './grafico.js';
import { mostrarToast } from './ui.js';

const TEMAS = ['auto', 'claro', 'escuro', 'alto-contraste'];
const NOMES = { auto: 'automático (do sistema)', claro: 'claro', escuro: 'escuro', 'alto-contraste': 'alto contraste' };

function aplicarTema(tema) {
  const raiz = document.documentElement;
  // "auto" = sem atributo: o CSS segue prefers-color-scheme e prefers-contrast
  if (tema === 'auto') delete raiz.dataset.tema;
  else raiz.dataset.tema = tema;
  atualizarCoresGrafico(); // o Chart.js desenha num canvas, então precisa ser avisado
}

export function iniciarTema() {
  const seletor = document.getElementById('seletor-tema');
  const salvo = TEMAS.includes(lerTema()) ? lerTema() : 'auto';
  aplicarTema(salvo);
  if (!seletor) return;
  seletor.value = salvo;

  seletor.addEventListener('change', () => {
    aplicarTema(seletor.value);
    salvarTema(seletor.value);
    mostrarToast(`Tema ${NOMES[seletor.value]} ativado.`);
  });

  // no modo automático, se o sistema mudar (ex.: celular escurece à noite), o gráfico acompanha
  ['(prefers-color-scheme: dark)', '(prefers-contrast: more)'].forEach((consulta) =>
    window.matchMedia(consulta).addEventListener('change', atualizarCoresGrafico));
}

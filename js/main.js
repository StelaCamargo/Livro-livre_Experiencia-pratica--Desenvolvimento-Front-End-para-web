/* main.js — ponto de entrada da SPA.
   Importa os módulos, define as rotas e inicia a aplicação. */

import { iniciarRouter } from './modules/router.js';
import { iniciarMenu, iniciarLinkPular, mostrarToast, abrirModal } from './modules/ui.js';
import { listarVoluntarios } from './modules/armazenamento.js';
import {
  paginaInicio, paginaProjetos, paginaCadastro,
  paginaVoluntarios, paginaComponentes, paginaNaoEncontrada
} from './modules/templates.js';
import { montarProjetos } from './modules/projetos.js';
import { montarCadastro } from './modules/formulario.js';
import { montarVoluntarios } from './modules/voluntarios.js';

/* tabela de rotas: cada rota tem título, template e (opcional) montar */
const rotas = {
  inicio:      { titulo: 'Bibliotecas comunitárias', template: paginaInicio },
  projetos:    { titulo: 'Projetos sociais', template: paginaProjetos, montar: montarProjetos },
  cadastro:    { titulo: 'Seja voluntário', template: paginaCadastro, montar: montarCadastro },
  voluntarios: { titulo: 'Voluntários', template: () => paginaVoluntarios(listarVoluntarios()), montar: montarVoluntarios },
  componentes: {
    titulo: 'Guia de componentes',
    template: paginaComponentes,
    montar: (raiz) => {
      raiz.addEventListener('click', (e) => {
        const demo = e.target.closest('[data-demo]')?.dataset.demo;
        if (demo === 'modal') abrirModal({ titulo: 'Cadastro enviado!', texto: 'Exemplo de modal usando o elemento nativo <dialog>.' });
        if (demo === 'toast-sucesso') mostrarToast('Cadastro salvo! Em breve entraremos em contato.', 'sucesso');
        if (demo === 'toast-erro') mostrarToast('Não foi possível enviar. Tente de novo.', 'erro');
      });
    }
  },
  404:         { titulo: 'Página não encontrada', template: paginaNaoEncontrada }
};

iniciarMenu();
iniciarLinkPular();
iniciarRouter(rotas);

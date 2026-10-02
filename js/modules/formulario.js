/* formulario.js — comportamento da tela de cadastro:
   máscaras, validação com feedback, rascunho e gravação no localStorage. */

import { mascaras, regras, validarTudo, IDADE_MINIMA } from './validacao.js';
import { salvarVoluntario, cpfJaCadastrado, lerRascunho, salvarRascunho, apagarRascunho } from './armazenamento.js';
import { mostrarToast, abrirModal } from './ui.js';

/* lê todos os valores do formulário em um objeto simples */
function lerDados(form) {
  const fd = new FormData(form);
  return {
    nome: (fd.get('nome') || '').trim(),
    cpf: fd.get('cpf') || '',
    nasc: fd.get('nasc') || '',
    email: (fd.get('email') || '').trim(),
    tel: fd.get('tel') || '',
    cep: fd.get('cep') || '',
    rua: (fd.get('rua') || '').trim(),
    uf: fd.get('uf') || '',
    projeto: fd.get('projeto') || '',
    disp: fd.get('disp') || '',
    msg: (fd.get('msg') || '').trim(),
    lgpd: form.lgpd.checked
  };
}

/* mostra ou limpa o erro de um campo */
function mostrarResultado(form, nome, mensagem) {
  const bloco = form.querySelector(`[data-campo="${nome}"]`);
  if (!bloco) return;
  const erro = bloco.querySelector('.campo__erro');
  const controles = bloco.querySelectorAll('input, select, textarea');

  bloco.classList.toggle('campo--invalido', Boolean(mensagem));
  bloco.classList.toggle('campo--valido', !mensagem);
  if (erro) erro.textContent = mensagem;
  controles.forEach((c) => c.setAttribute('aria-invalid', mensagem ? 'true' : 'false'));
}

function validarCampo(form, nome) {
  const dados = lerDados(form);
  const mensagem = regras[nome] ? regras[nome](dados[nome] ?? '') : '';
  mostrarResultado(form, nome, mensagem);
  return !mensagem;
}

function preencher(form, dados) {
  Object.entries(dados).forEach(([nome, valor]) => {
    if (nome === 'lgpd') return; // o aceite sempre precisa ser marcado de novo
    if (nome === 'disp') {
      const radio = form.querySelector(`input[name="disp"][value="${valor}"]`);
      if (radio) radio.checked = true;
      return;
    }
    if (form.elements[nome]) form.elements[nome].value = valor;
  });
}

export function montarCadastro(raiz) {
  const form = raiz.querySelector('#form-cadastro');
  const alertaErro = raiz.querySelector('#alerta-erro');
  const alertaRascunho = raiz.querySelector('#alerta-rascunho');
  const enviar = form.querySelector('button[type="submit"]');
  const tocados = new Set(); // campos que a pessoa já visitou

  // data máxima de nascimento = hoje menos a idade mínima
  const limite = new Date();
  limite.setFullYear(limite.getFullYear() - IDADE_MINIMA);
  form.nasc.max = limite.toISOString().slice(0, 10);

  // recupera o rascunho salvo
  const rascunho = lerRascunho();
  if (rascunho) {
    preencher(form, rascunho);
    alertaRascunho.hidden = false;
  }

  // botão de envio só habilita depois do aceite da LGPD
  const atualizarBotao = () => { enviar.disabled = !form.lgpd.checked; };
  atualizarBotao();

  // máscaras + rascunho + revalidação enquanto digita
  form.addEventListener('input', (e) => {
    const campo = e.target;
    if (mascaras[campo.name]) campo.value = mascaras[campo.name](campo.value);
    if (tocados.has(campo.name)) validarCampo(form, campo.name);
    const { lgpd, ...semAceite } = lerDados(form);
    salvarRascunho(semAceite);
  });

  form.addEventListener('change', (e) => {
    if (e.target.name === 'lgpd') atualizarBotao();
    if (['uf', 'projeto', 'disp', 'lgpd', 'nasc'].includes(e.target.name)) {
      tocados.add(e.target.name);
      validarCampo(form, e.target.name);
    }
  });

  // valida ao sair do campo (blur não "borbulha", então usamos focusout)
  form.addEventListener('focusout', (e) => {
    const nome = e.target.name;
    if (!nome || !e.target.value) return;
    tocados.add(nome);
    validarCampo(form, nome);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = lerDados(form);
    const erros = validarTudo(dados);

    Object.keys(regras).forEach((nome) => {
      tocados.add(nome);
      mostrarResultado(form, nome, erros[nome] || '');
    });

    if (!erros.cpf && cpfJaCadastrado(dados.cpf)) {
      erros.cpf = 'Este CPF já está cadastrado.';
      mostrarResultado(form, 'cpf', erros.cpf);
    }

    const total = Object.keys(erros).length;
    if (total) {
      alertaErro.querySelector('.alerta__texto').textContent =
        total === 1 ? '1 campo precisa de atenção.' : `${total} campos precisam de atenção.`;
      alertaErro.hidden = false;
      alertaErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.querySelector('[aria-invalid="true"]')?.focus({ preventScroll: true });
      return;
    }

    alertaErro.hidden = true;
    const { lgpd, ...registro } = dados;
    const salvo = salvarVoluntario(registro);
    if (!salvo) {
      mostrarToast('Não foi possível salvar. Verifique se o navegador permite armazenamento.', 'erro');
      return;
    }

    apagarRascunho();
    abrirModal({
      titulo: 'Cadastro enviado!',
      texto: `Obrigado, ${registro.nome.split(' ')[0]}! Seus dados foram salvos e a equipe vai entrar em contato.`,
      aoFechar: () => {
        mostrarToast('Cadastro salvo! Veja a lista em "Voluntários".', 'sucesso');
        location.hash = '#/voluntarios';
      }
    });
  });
}

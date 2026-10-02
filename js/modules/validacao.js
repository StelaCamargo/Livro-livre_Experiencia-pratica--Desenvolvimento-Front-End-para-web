/* validacao.js — máscaras e regras de validação do formulário.
   Cada regra recebe o valor e devolve '' (válido) ou a mensagem de erro. */

const soNumeros = (v) => v.replace(/\D/g, '');

/* ---------- máscaras ---------- */
export const mascaras = {
  cpf(v) {
    v = soNumeros(v).slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  tel(v) {
    v = soNumeros(v).slice(0, 11);
    if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    return v.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
      '(' + a + ')' + (b ? ' ' + b : '') + (c ? '-' + c : ''));
  },
  cep(v) {
    return soNumeros(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
  }
};

/* ---------- auxiliares ---------- */
export function cpfValido(valor) {
  const v = soNumeros(valor);
  if (v.length !== 11 || /^(\d)\1+$/.test(v)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(v[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(v[t])) return false;
  }
  return true;
}

export function idade(dataISO) {
  const nasc = new Date(dataISO + 'T00:00:00');
  if (Number.isNaN(nasc.getTime())) return -1;
  const hoje = new Date();
  let anos = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) anos--;
  return anos;
}

export const IDADE_MINIMA = 18;

/* ---------- regras ---------- */
export const regras = {
  nome: (v) => {
    const t = v.trim();
    if (!t) return 'Informe seu nome completo.';
    if (t.length < 5 || !t.includes(' ')) return 'Digite nome e sobrenome (mínimo 5 letras).';
    return '';
  },
  cpf: (v) => {
    if (!v) return 'Informe seu CPF.';
    return cpfValido(v) ? '' : 'CPF inválido. Confira os números.';
  },
  nasc: (v) => {
    if (!v) return 'Informe sua data de nascimento.';
    const anos = idade(v);
    if (anos < 0 || anos > 120) return 'Data inválida.';
    if (anos < IDADE_MINIMA) return `É preciso ter ${IDADE_MINIMA} anos ou mais.`;
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Informe seu e-mail.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido (ex.: nome@email.com).';
  },
  tel: (v) => {
    if (!v) return 'Informe seu telefone com DDD.';
    return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ? '' : 'Use o formato (11) 91234-5678.';
  },
  cep: (v) => {
    if (!v) return 'Informe seu CEP.';
    return /^\d{5}-\d{3}$/.test(v) ? '' : 'O CEP precisa ter 8 dígitos.';
  },
  rua: (v) => (v.trim().length >= 3 ? '' : 'Informe a rua e o número.'),
  uf: (v) => (v ? '' : 'Selecione o estado.'),
  projeto: (v) => (v ? '' : 'Escolha um projeto.'),
  disp: (v) => (v ? '' : 'Escolha sua disponibilidade.'),
  lgpd: (v) => (v ? '' : 'É preciso autorizar o uso dos dados para continuar.'),
  msg: () => ''
};

/* valida um objeto inteiro e devolve { campo: mensagem } só com os erros */
export function validarTudo(dados) {
  const erros = {};
  Object.keys(regras).forEach((campo) => {
    const msg = regras[campo](dados[campo] ?? '');
    if (msg) erros[campo] = msg;
  });
  return erros;
}

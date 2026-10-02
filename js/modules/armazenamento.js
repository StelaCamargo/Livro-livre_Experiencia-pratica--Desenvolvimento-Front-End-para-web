/* armazenamento.js — tudo que toca no localStorage fica aqui.
   Os outros módulos nunca acessam o localStorage diretamente. */

const CHAVE_VOLUNTARIOS = 'livroLivre:voluntarios';
const CHAVE_RASCUNHO = 'livroLivre:rascunho';

// leitura segura: se o dado estiver corrompido ou o navegador bloquear, devolve o padrão
function ler(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch (erro) {
    console.warn('Não foi possível ler o localStorage:', erro);
    return padrao;
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch (erro) {
    console.warn('Não foi possível gravar no localStorage:', erro);
    return false;
  }
}

/* ---- voluntários ---- */
export function listarVoluntarios() {
  return ler(CHAVE_VOLUNTARIOS, []);
}

export function salvarVoluntario(dados) {
  const lista = listarVoluntarios();
  const novo = {
    ...dados,
    id: Date.now().toString(36),
    criadoEm: new Date().toISOString()
  };
  lista.push(novo);
  return gravar(CHAVE_VOLUNTARIOS, lista) ? novo : null;
}

export function removerVoluntario(id) {
  const lista = listarVoluntarios().filter((v) => v.id !== id);
  gravar(CHAVE_VOLUNTARIOS, lista);
  return lista;
}

export function limparVoluntarios() {
  gravar(CHAVE_VOLUNTARIOS, []);
}

export function cpfJaCadastrado(cpf) {
  return listarVoluntarios().some((v) => v.cpf === cpf);
}

/* ---- rascunho do formulário (salvo enquanto a pessoa digita) ---- */
export function lerRascunho() {
  return ler(CHAVE_RASCUNHO, null);
}

export function salvarRascunho(dados) {
  gravar(CHAVE_RASCUNHO, dados);
}

export function apagarRascunho() {
  try { localStorage.removeItem(CHAVE_RASCUNHO); } catch (e) { /* ignora */ }
}

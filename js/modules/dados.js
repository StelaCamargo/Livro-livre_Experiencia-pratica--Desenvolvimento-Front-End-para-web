/* dados.js — conteúdo da ONG separado da apresentação.
   Os templates leem daqui; para mudar um projeto, basta editar este arquivo. */

export const projetos = [
  {
    id: 'biblioteca-esquina',
    titulo: 'Biblioteca de Esquina',
    descricao: 'Estantes abertas em praças, padarias e centros comunitários, com empréstimo sem burocracia.',
    local: 'Itaquera e Guaianases. Funcionamento de terça a sábado.',
    frequencia: 'Terça a sábado',
    categoria: 'acervo',
    status: { texto: 'Vagas abertas', tipo: 'sucesso' },
    resultado: { valor: '4.200', rotulo: 'empréstimos' }
  },
  {
    id: 'roda-leitura',
    titulo: 'Roda de Leitura',
    descricao: 'Encontros semanais de leitura em voz alta e conversa para crianças e famílias.',
    local: 'São Mateus. Sábados, das 10h às 12h.',
    frequencia: 'Sábados',
    categoria: 'mediacao',
    status: { texto: 'Últimas vagas', tipo: 'aviso' },
    destaque: true,
    resultado: { valor: '380', rotulo: 'participantes' }
  },
  {
    id: 'livro-viajante',
    titulo: 'Livro Viajante',
    descricao: 'Caixas de livros que circulam por escolas e ocupações, trocadas a cada mês.',
    local: 'Escolas parceiras da zona leste. Roteiro mensal.',
    frequencia: 'Mensal',
    categoria: 'acervo',
    status: { texto: 'Novo', tipo: 'destaque' },
    resultado: { valor: '1.150', rotulo: 'livros em circulação' }
  }
];

export const categorias = [
  { id: 'todos', nome: 'Todos' },
  { id: 'acervo', nome: 'Acervo e empréstimo' },
  { id: 'mediacao', nome: 'Mediação de leitura' }
];

export const formasDeAjudar = [
  { titulo: 'Mediar e organizar', texto: 'Mediando uma roda de leitura ou cuidando do acervo.' },
  { titulo: 'Doar', texto: 'Doando livros em bom estado ou apoiando com valores mensais.' },
  { titulo: 'Divulgar', texto: 'Divulgando as bibliotecas para sua rede.' }
];

export const disponibilidades = {
  semana: 'Dias de semana',
  fds: 'Fins de semana'
};

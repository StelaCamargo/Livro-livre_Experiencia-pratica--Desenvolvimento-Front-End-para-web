/* templates.js — funções que recebem dados e devolvem o HTML de cada tela.
   Nenhuma regra de negócio aqui: só apresentação (template literals). */

import { projetos, categorias, formasDeAjudar, disponibilidades } from './dados.js';
import { escaparHTML } from './ui.js';

const obrigatorio = '<abbr class="obrigatorio" title="obrigatório">*</abbr>';

/* ---------- peças reutilizáveis ---------- */
export function badge(texto, tipo = '') {
  return `<small class="badge${tipo ? ' badge--' + tipo : ''}">${escaparHTML(texto)}</small>`;
}

export function alerta({ tipo = '', titulo, texto, id = '', role = 'status', oculto = false }) {
  return `
    <p class="alerta${tipo ? ' alerta--' + tipo : ''}" role="${role}"${id ? ` id="${id}"` : ''}${oculto ? ' hidden' : ''}>
      <strong class="alerta__titulo">${titulo}</strong>
      <small class="alerta__texto">${texto}</small>
    </p>`;
}

export function cardProjeto(p) {
  return `
    <article class="card${p.destaque ? ' card--destaque' : ''}" data-categoria="${p.categoria}">
      <p class="card__etiqueta">${badge(p.frequencia)} ${badge(p.status.texto, p.status.tipo)}</p>
      <h3 class="card__titulo" id="${p.id}" tabindex="-1">${p.titulo}</h3>
      <p class="card__texto">${p.descricao}</p>
      <p class="card__info">Local: ${p.local}</p>
    </article>`;
}

export function listaDeCards(lista) {
  if (!lista.length) {
    return alerta({ titulo: 'Nenhum projeto nesta categoria', texto: 'Escolha outro filtro para ver mais projetos.' });
  }
  return lista.map(cardProjeto).join('');
}

/* campo de texto com label, ajuda opcional e espaço para a mensagem de erro */
function campo({ id, rotulo, tipo = 'text', classe = '', attrs = '', ajuda = '' }) {
  return `
    <p class="campo${classe ? ' ' + classe : ''}" data-campo="${id}">
      <label for="${id}">${rotulo} ${obrigatorio}</label>
      <input id="${id}" name="${id}" type="${tipo}" required ${attrs} aria-describedby="${ajuda ? id + '-ajuda ' : ''}${id}-erro">
      ${ajuda ? `<small class="campo__ajuda" id="${id}-ajuda">${ajuda}</small>` : ''}
      <small class="campo__erro" id="${id}-erro" aria-live="polite"></small>
    </p>`;
}

/* ---------- telas ---------- */
export function paginaInicio() {
  return `
    <section class="hero grade-12" aria-labelledby="t-pagina">
      <header class="hero__conteudo">
        <h1 class="hero__titulo" id="t-pagina" tabindex="-1">Todo bairro merece uma estante aberta.</h1>
        <p class="hero__texto">Há 9 anos, a Livro Livre monta bibliotecas comunitárias e rodas de leitura em bairros da zona leste de São Paulo, onde a livraria mais próxima fica a horas de ônibus.</p>
        <p><a class="btn" href="#/cadastro">Quero ser voluntário</a></p>
      </header>
      <figure class="hero__figura">
        <img src="../imagens/biblioteca.jpg" width="1200" height="799" alt="Duas pessoas escolhendo livros em uma estante comunitária cheia de livros coloridos">
      </figure>
    </section>

    <section class="secao missao grade-12" aria-labelledby="t-missao">
      <h2 id="t-missao">Nossa missão</h2>
      <p>Colocar livros nas mãos de crianças, jovens e adultos, com acervo gratuito, mediadores voluntários e a comunidade no comando de cada espaço.</p>
      <p><a class="link-seta" href="#/projetos">Conheça nossos projetos</a></p>
      <figure class="depoimento">
        <blockquote><p>Eu nunca tinha ganhado um livro. Agora tenho três e li todos.</p></blockquote>
        <figcaption>Depoimento de um leitor de 10 anos (nome preservado)</figcaption>
      </figure>
    </section>

    <section class="secao" aria-labelledby="t-como">
      <h2 id="t-como">Como você pode ajudar</h2>
      <p class="secao__intro">Não precisa ser professor nem ter experiência. Escolha a forma que cabe na sua rotina.</p>
      <ul class="cards vias grade-12">
        ${formasDeAjudar.map((f) => `
          <li class="card">
            <h3 class="card__titulo">${f.titulo}</h3>
            <p class="card__texto">${f.texto}</p>
          </li>`).join('')}
      </ul>
    </section>

    <aside class="chamada" aria-label="Convite">
      <p>Pronto para abrir uma estante com a gente?</p>
      <a class="btn" href="#/cadastro">Cadastre-se</a>
    </aside>`;
}

export function paginaProjetos() {
  return `
    <h1 id="t-pagina" tabindex="-1">Projetos sociais</h1>
    <p class="secao__intro">Três formas de aproximar pessoas e livros, todas tocadas por voluntários e moradores.</p>

    <p class="filtros" role="group" aria-label="Filtrar projetos por categoria">
      ${categorias.map((c, i) => `
        <button class="filtro" type="button" data-filtro="${c.id}" aria-pressed="${i === 0}">${c.nome}</button>`).join('')}
    </p>

    <section class="cards grade-12" id="lista-projetos" aria-label="Lista de projetos" aria-live="polite">
      ${listaDeCards(projetos)}
    </section>

    <section class="secao" aria-labelledby="t-numeros">
      <h2 id="t-numeros">Resultados do último ano</h2>
      <ul class="numeros grade-12">
        ${projetos.map((p) => `
          <li class="numeros__item"><strong class="numeros__valor">${p.resultado.valor}</strong> ${p.resultado.rotulo} <small class="numeros__rotulo">${p.titulo}</small></li>`).join('')}
      </ul>
      <figure class="grafico guia__bloco">
        <canvas id="grafico-resultados" role="img" aria-label="Gráfico de barras com os resultados do último ano de cada projeto"></canvas>
        <figcaption class="guia__nota">Gráfico gerado com a biblioteca Chart.js. Cada projeto mede um resultado diferente (passe o mouse nas barras).</figcaption>
      </figure>
    </section>

    <aside class="chamada" aria-label="Convite">
      <p>Quer fazer parte de um desses projetos?</p>
      <a class="btn" href="#/cadastro">Participe de um projeto</a>
    </aside>`;
}

export function paginaCadastro() {
  return `
    <section class="form-layout grade-12" aria-labelledby="t-pagina">
      <header class="form-layout__aside">
        <h1 id="t-pagina" tabindex="-1">Seja voluntário</h1>
        <p>Leva uns 3 minutos. Depois a gente entra em contato para combinar o melhor projeto e horário para você.</p>
        <p class="campo__ajuda">Campos marcados com ${obrigatorio} são obrigatórios.</p>
      </header>

      <form class="form" id="form-cadastro" novalidate>
        ${alerta({ titulo: 'Rascunho recuperado', texto: 'Preenchemos o formulário com o que você já tinha digitado.', id: 'alerta-rascunho', oculto: true })}
        ${alerta({ tipo: 'erro', role: 'alert', titulo: 'Confira os campos destacados', texto: '', id: 'alerta-erro', oculto: true })}

        <fieldset class="form__grupo grade-12 form__grupo--2col">
          <legend>Dados pessoais</legend>
          ${campo({ id: 'nome', rotulo: 'Nome completo', classe: 'campo--inteiro', attrs: 'autocomplete="name" maxlength="100"' })}
          ${campo({ id: 'cpf', rotulo: 'CPF', attrs: 'inputmode="numeric" maxlength="14" placeholder="000.000.000-00"', ajuda: 'Digite só os números; o formato é aplicado automaticamente.' })}
          ${campo({ id: 'nasc', rotulo: 'Data de nascimento', tipo: 'date' })}
        </fieldset>

        <fieldset class="form__grupo grade-12 form__grupo--2col">
          <legend>Contato</legend>
          ${campo({ id: 'email', rotulo: 'E-mail', tipo: 'email', attrs: 'autocomplete="email"' })}
          ${campo({ id: 'tel', rotulo: 'Telefone com DDD', tipo: 'tel', attrs: 'inputmode="numeric" maxlength="15" placeholder="(11) 91234-5678" autocomplete="tel"' })}
        </fieldset>

        <fieldset class="form__grupo grade-12 form__grupo--endereco">
          <legend>Endereço</legend>
          ${campo({ id: 'cep', rotulo: 'CEP', classe: 'campo--curto', attrs: 'inputmode="numeric" maxlength="9" placeholder="00000-000" autocomplete="postal-code"' })}
          ${campo({ id: 'rua', rotulo: 'Rua e número', classe: 'campo--medio', attrs: 'autocomplete="address-line1"' })}
          <p class="campo campo--curto" data-campo="uf">
            <label for="uf">Estado ${obrigatorio}</label>
            <select id="uf" name="uf" required aria-describedby="uf-erro">
              <option value="">Selecione</option>
              <option>SP</option><option>RJ</option><option>MG</option><option>Outro</option>
            </select>
            <small class="campo__erro" id="uf-erro" aria-live="polite"></small>
          </p>
        </fieldset>

        <fieldset class="form__grupo grade-12">
          <legend>Como quer ajudar</legend>
          <p class="campo" data-campo="projeto">
            <label for="projeto">Projeto de interesse ${obrigatorio}</label>
            <select id="projeto" name="projeto" required aria-describedby="projeto-erro">
              <option value="">Selecione</option>
              ${projetos.map((p) => `<option value="${p.id}">${p.titulo}</option>`).join('')}
            </select>
            <small class="campo__erro" id="projeto-erro" aria-live="polite"></small>
          </p>
          <fieldset class="opcoes" data-campo="disp" aria-describedby="disp-erro">
            <legend>Disponibilidade ${obrigatorio}</legend>
            ${Object.entries(disponibilidades).map(([valor, texto]) => `
              <label class="opcao" for="disp-${valor}"><input type="radio" id="disp-${valor}" name="disp" value="${valor}" required> ${texto}</label>`).join('')}
            <small class="campo__erro" id="disp-erro" aria-live="polite"></small>
          </fieldset>
          <p class="campo" data-campo="msg">
            <label for="msg">Qual livro mudou a sua vida?</label>
            <textarea id="msg" name="msg" rows="4" maxlength="500"></textarea>
          </p>
        </fieldset>

        <p class="campo" data-campo="lgpd">
          <label class="aceite" for="lgpd">
            <input type="checkbox" id="lgpd" name="lgpd" required aria-describedby="lgpd-erro">
            Autorizo o uso dos meus dados para contato sobre o voluntariado, conforme a LGPD. ${obrigatorio}
          </label>
          <small class="campo__erro" id="lgpd-erro" aria-live="polite"></small>
        </p>

        <p class="form__acoes">
          <button class="btn" type="submit">Enviar cadastro</button>
          <small class="campo__ajuda">Os dados ficam salvos neste navegador (localStorage).</small>
        </p>
      </form>
    </section>`;
}

export function paginaVoluntarios(lista) {
  const nomeProjeto = (id) => (projetos.find((p) => p.id === id) || {}).titulo || id;
  const ocultarCpf = (cpf) => '***.***.' + String(cpf).slice(-6);

  if (!lista.length) {
    return `
      <h1 id="t-pagina" tabindex="-1">Voluntários cadastrados</h1>
      ${alerta({ titulo: 'Ainda não há cadastros', texto: 'Os cadastros feitos em "Seja voluntário" aparecem aqui.' })}
      <p><a class="btn" href="#/cadastro">Fazer o primeiro cadastro</a></p>`;
  }

  return `
    <h1 id="t-pagina" tabindex="-1">Voluntários cadastrados</h1>
    <p class="lista-topo">
      ${badge(lista.length + (lista.length === 1 ? ' cadastro' : ' cadastros'), 'sucesso')}
      <button class="btn btn--perigo" type="button" data-acao="limpar">Apagar todos</button>
    </p>
    <ul class="cards grade-12" id="lista-voluntarios">
      ${lista.map((v) => `
        <li class="card" data-id="${escaparHTML(v.id)}">
          <p class="card__etiqueta">${badge(nomeProjeto(v.projeto))} ${badge(disponibilidades[v.disp] || v.disp, 'destaque')}</p>
          <h2 class="card__titulo">${escaparHTML(v.nome)}</h2>
          <ul class="voluntario__dados">
            <li>E-mail: ${escaparHTML(v.email)}</li>
            <li>Telefone: ${escaparHTML(v.tel)}</li>
            <li>CPF: ${escaparHTML(ocultarCpf(v.cpf))}</li>
            <li>${escaparHTML(v.uf)} &middot; cadastrado em ${new Date(v.criadoEm).toLocaleDateString('pt-BR')}</li>
            ${v.msg ? `<li>Livro favorito: ${escaparHTML(v.msg)}</li>` : ''}
          </ul>
          <p class="voluntario__acoes">
            <button class="btn btn--perigo" type="button" data-acao="remover" data-id="${escaparHTML(v.id)}" aria-label="Remover cadastro de ${escaparHTML(v.nome)}">Remover</button>
          </p>
        </li>`).join('')}
    </ul>`;
}

export function paginaComponentes() {
  return `
    <h1 id="t-pagina" tabindex="-1">Guia de componentes</h1>
    <p class="secao__intro">Padrão visual dos componentes da plataforma. Todos são gerados pelas funções de templates.js.</p>

    <section class="guia__bloco" aria-labelledby="t-badges">
      <h2 id="t-badges">Badges</h2>
      <p class="guia__linha">
        ${badge('Sábados')} ${badge('Vagas abertas', 'sucesso')} ${badge('Últimas vagas', 'aviso')}
        ${badge('Vagas esgotadas', 'erro')} ${badge('Novo', 'destaque')}
      </p>
    </section>

    <section class="guia__bloco" aria-labelledby="t-alertas">
      <h2 id="t-alertas">Alertas</h2>
      ${alerta({ titulo: 'Informação', texto: 'As rodas de leitura voltam na primeira semana do mês.' })}
      ${alerta({ tipo: 'sucesso', titulo: 'Cadastro enviado', texto: 'Recebemos seus dados e vamos entrar em contato.' })}
      ${alerta({ tipo: 'aviso', titulo: 'Atenção', texto: 'Restam poucas vagas na Roda de Leitura.' })}
      ${alerta({ tipo: 'erro', role: 'alert', titulo: 'Confira os campos destacados', texto: 'Alguns campos estão vazios ou com formato inválido.' })}
    </section>

    <section class="guia__bloco" aria-labelledby="t-botoes">
      <h2 id="t-botoes">Botões, toast e modal</h2>
      <p class="guia__linha">
        <button class="btn" type="button" data-demo="modal">Abrir modal</button>
        <button class="btn btn--secundario" type="button" data-demo="toast-sucesso">Toast de sucesso</button>
        <button class="btn btn--secundario" type="button" data-demo="toast-erro">Toast de erro</button>
        <button class="btn" type="button" disabled>Desabilitado</button>
      </p>
    </section>`;
}

export function paginaNaoEncontrada() {
  return `
    <h1 id="t-pagina" tabindex="-1">Página não encontrada</h1>
    ${alerta({ tipo: 'aviso', titulo: 'Esse endereço não existe', texto: 'Confira o link ou volte para a página inicial.' })}
    <p><a class="btn" href="#/inicio">Voltar ao início</a></p>`;
}

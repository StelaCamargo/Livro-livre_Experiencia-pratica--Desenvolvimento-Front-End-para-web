/* grafico.js — integração com a biblioteca externa Chart.js (carregada via CDN no index.html).
   O Chart.js fica isolado neste módulo: o resto da aplicação só chama desenharGrafico(). */

let graficoAtual = null;

const numero = (texto) => Number(String(texto).replace(/\./g, '')); // "4.200" -> 4200

/* lê as cores do tema atual direto dos tokens do CSS */
function coresDoTema() {
  const css = getComputedStyle(document.documentElement);
  const token = (nome) => css.getPropertyValue(nome).trim();
  return {
    barras: [token('--cor-primaria'), token('--cor-destaque'), token('--cor-primaria-clara')],
    texto: token('--cor-texto-suave'),
    grade: token('--cor-superficie-suave')
  };
}

function aplicarCores(grafico) {
  const cores = coresDoTema();
  grafico.data.datasets[0].backgroundColor = cores.barras;
  ['x', 'y'].forEach((eixo) => {
    grafico.options.scales[eixo].ticks.color = cores.texto;
    grafico.options.scales[eixo].grid.color = cores.grade;
  });
}

/* chamada pelo tema.js quando o modo de cor muda */
export function atualizarCoresGrafico() {
  if (!graficoAtual?.canvas?.isConnected) return;
  aplicarCores(graficoAtual);
  graficoAtual.update();
}

export function desenharGrafico(canvas, projetos) {
  // se o CDN não carregar (sem internet, bloqueio), o site segue funcionando sem o gráfico
  if (!canvas || typeof window.Chart === 'undefined') {
    if (canvas) canvas.closest('figure').hidden = true;
    return null;
  }

  // destrói o gráfico anterior antes de criar outro (evita acumular instâncias ao trocar de tela)
  if (graficoAtual) graficoAtual.destroy();

  graficoAtual = new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: projetos.map((p) => p.titulo),
      datasets: [{
        label: 'Resultado do último ano',
        data: projetos.map((p) => numero(p.resultado.valor)),
        backgroundColor: [],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      aspectRatio: window.innerWidth < 600 ? 1.2 : 2.5, // mais alto no celular
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y.toLocaleString('pt-BR')} ${projetos[ctx.dataIndex].resultado.rotulo}`
          }
        }
      },
      scales: {
        x: { ticks: {}, grid: {} },
        y: { beginAtZero: true, ticks: {}, grid: {} }
      }
    }
  });
  aplicarCores(graficoAtual);
  graficoAtual.update();

  return graficoAtual;
}

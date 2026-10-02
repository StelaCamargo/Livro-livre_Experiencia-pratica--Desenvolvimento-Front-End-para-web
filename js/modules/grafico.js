/* grafico.js — integração com a biblioteca externa Chart.js (carregada via CDN no index.html).
   O Chart.js fica isolado neste módulo: o resto da aplicação só chama desenharGrafico(). */

let graficoAtual = null;

const numero = (texto) => Number(String(texto).replace(/\./g, '')); // "4.200" -> 4200

export function desenharGrafico(canvas, projetos) {
  // se o CDN não carregar (sem internet, bloqueio), o site segue funcionando sem o gráfico
  if (!canvas || typeof window.Chart === 'undefined') {
    if (canvas) canvas.closest('figure').hidden = true;
    return null;
  }

  // destrói o gráfico anterior antes de criar outro (evita acumular instâncias ao trocar de tela)
  if (graficoAtual) graficoAtual.destroy();

  const cores = getComputedStyle(document.documentElement);

  graficoAtual = new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: projetos.map((p) => p.titulo),
      datasets: [{
        label: 'Resultado do último ano',
        data: projetos.map((p) => numero(p.resultado.valor)),
        backgroundColor: [
          cores.getPropertyValue('--cor-primaria').trim(),
          cores.getPropertyValue('--cor-destaque').trim(),
          cores.getPropertyValue('--cor-primaria-clara').trim()
        ],
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
      scales: { y: { beginAtZero: true } }
    }
  });

  return graficoAtual;
}

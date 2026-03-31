let questoes = [];
let respostas = [];
let indice = 0;
let tempo = 60 * 60;
let intervalo;

async function carregar() {
  try {
    const banco = document.getElementById("banco").value;

    const res = await fetch(`./data/${banco}_01.json`);
    const data = await res.json();

    questoes = embaralhar(data).slice(0, 20);
    respostas = [];
    indice = 0;

    iniciarTimer();
    mostrar();

  } catch (e) {
    alert("Erro ao carregar questões");
    console.error(e);
  }
}

function mostrar() {
  const div = document.getElementById("quiz");
  div.innerHTML = "";

  if (indice >= questoes.length) {
    finalizar();
    return;
  }

  const q = questoes[indice];

  div.innerHTML = `
    <div class="card">
      <p>${indice + 1}. ${q.pergunta}</p>
      ${q.opcoes.map((o, j) =>
        `<button onclick="responder(${j})">${o}</button>`
      ).join("<br>")}
    </div>
  `;
}

function responder(respostaEscolhida) {
  respostas[indice] = respostaEscolhida;
  indice++;
  mostrar();
}

function iniciarTimer() {
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    tempo--;
    document.getElementById("timer").innerText =
      "Tempo: " + Math.floor(tempo / 60) + ":" + String(tempo % 60).padStart(2, '0');

    if (tempo <= 0) finalizar();
  }, 1000);
}

function finalizar() {
  clearInterval(intervalo);

  let acertos = 0;

  questoes.forEach((q, i) => {
    if (respostas[i] === q.resposta) acertos++;
  });

  let total = questoes.length;
  let erros = total - acertos;
  let percentual = (acertos / total) * 100;

  let aprovado = percentual >= 70 ? "APROVADO ✅" : "REPROVADO ❌";

  document.getElementById("quiz").innerHTML = "";
  document.getElementById("resultado").innerHTML = `
    <h2>Resultado Final</h2>
    <p>Acertos: ${acertos}</p>
    <p>Erros: ${erros}</p>
    <p>Aproveitamento: ${percentual.toFixed(1)}%</p>
    <h3>${aprovado}</h3>
  `;
}

function embaralhar(a) {
  return a.sort(() => Math.random() - 0.5);
}

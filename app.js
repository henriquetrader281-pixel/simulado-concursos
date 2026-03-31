let questoes = [];
let respostas = [];
let indice = 0;
let intervalo;
let tempo = 3600;
let usuarioAtual = "";

const ADMIN = "admin123";
const USER = "aluno123";

// LOGIN
function validar() {
  const senha = document.getElementById("senha").value.trim();

  if (senha === ADMIN) usuarioAtual = "admin";
  else if (senha === USER) usuarioAtual = "aluno";
  else return alert("Senha inválida");

  document.getElementById("sistema").style.display = "block";
}

// BANCO SIMPLES
const bancoQuestoes = {
  bb: [
    {disciplina:"portugues", pergunta:"Crase correta:", opcoes:["Vou a escola","Vou à escola","Errado","Nenhuma"], resposta:1},
    {disciplina:"matematica", pergunta:"10% de 200:", opcoes:["10","20","30","40"], resposta:1}
  ]
};

// SIMULADO NORMAL
function carregar() {
  let todas = bancoQuestoes["bb"];

  questoes = [...todas, ...todas, ...todas];
  respostas = [];
  indice = 0;

  iniciarTimer();
  mostrar();
}

// 🔥 IA REAL
async function gerarIA() {
  try {
    const resposta = await fetch("/api/gerar");
    const data = await resposta.json();

    let texto = data.choices[0].message.content;

    let novas = JSON.parse(texto);

    questoes = novas;
    respostas = [];
    indice = 0;

    iniciarTimer();
    mostrar();

  } catch (e) {
    alert("Erro IA");
    console.error(e);
  }
}

// MOSTRAR
function mostrar() {
  if (indice >= questoes.length) return finalizar();

  const q = questoes[indice];

  let html = `<div class="card">`;
  html += `<h3>${indice + 1}. ${q.pergunta}</h3>`;

  q.opcoes.forEach((op, i) => {
    html += `<button onclick="responder(${i})">${op}</button>`;
  });

  html += `</div>`;

  document.getElementById("quiz").innerHTML = html;
}

// RESPONDER
function responder(op) {
  respostas[indice] = op;
  indice++;
  mostrar();
}

// TIMER
function iniciarTimer() {
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    tempo--;
    document.getElementById("timer").innerText =
      Math.floor(tempo/60)+":"+String(tempo%60).padStart(2,"0");

    if (tempo <= 0) finalizar();
  }, 1000);
}

// FINALIZAR
function finalizar() {
  clearInterval(intervalo);

  let acertos = 0;

  questoes.forEach((q, i) => {
    if (respostas[i] === q.resposta) acertos++;
  });

  let percentual = (acertos / questoes.length) * 100;

  document.getElementById("resultado").innerHTML =
    `<h2>${percentual>=70?"APROVADO":"REPROVADO"}</h2>`;
}

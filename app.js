// =====================
// CONFIG
// =====================
let questoes = [];
let respostas = [];
let indice = 0;
let tempo = 3600;
let intervalo;
let usuarioAtual = "";

const ADMIN = "admin123";
const USER = "aluno123";


// =====================
// LOGIN
// =====================
function validar() {
  const senha = document.getElementById("senha").value.trim();

  if (senha === ADMIN) usuarioAtual = "admin";
  else if (senha === USER) usuarioAtual = "aluno";
  else return alert("Senha inválida");

  document.getElementById("sistema").style.display = "block";
}


// =====================
// BANCO BASE
// =====================
const bancoQuestoes = {
  bb: [
    {disciplina:"portugues", pergunta:"Crase correta:", opcoes:["Vou a escola","Vou à escola","Errado","Nenhuma"], resposta:1},
    {disciplina:"matematica", pergunta:"10% de 200:", opcoes:["10","20","30","40"], resposta:1},
    {disciplina:"bancarios", pergunta:"PIX é:", opcoes:["Moeda","Pagamento instantâneo","Cartão","Banco"], resposta:1}
  ],
  fenac: [
    {disciplina:"logica", pergunta:"2,4,6,?", opcoes:["7","8","9","10"], resposta:1},
    {disciplina:"informatica", pergunta:"CPU é:", opcoes:["Memória","Processador","HD","Fonte"], resposta:1}
  ],
  nh: [
    {disciplina:"portugues", pergunta:"Plural de cidadão:", opcoes:["Cidadões","Cidadãos","Cidadães","Cidadens"], resposta:1}
  ]
};


// =====================
// SIMULADO NORMAL
// =====================
function carregar() {
  const banco = document.getElementById("banco").value;
  const disciplina = document.getElementById("disciplina").value;

  let todas = bancoQuestoes[banco];

  if (disciplina) {
    todas = todas.filter(q => q.disciplina === disciplina);
  }

  questoes = embaralhar([...todas, ...todas, ...todas]).slice(0, 20);

  respostas = [];
  indice = 0;

  iniciarTimer();
  mostrar();
}


// =====================
// IA LOCAL (SEM API)
// =====================
function gerarIA() {

  const disciplina = document.getElementById("disciplina").value;

  const baseIA = [

    {
      disciplina,
      pergunta: "IA: 15% de 300 é:",
      opcoes: ["30","45","60","90"],
      resposta: 1
    },
    {
      disciplina,
      pergunta: "IA: O que é CPU?",
      opcoes: ["Memória","Processador","HD","Fonte"],
      resposta: 1
    },
    {
      disciplina,
      pergunta: "IA: Sequência 5,10,15,?",
      opcoes: ["20","25","30","35"],
      resposta: 0
    }

  ];

  questoes = embaralhar([...baseIA, ...baseIA, ...baseIA]).slice(0, 20);

  respostas = [];
  indice = 0;

  iniciarTimer();
  mostrar();
}


// =====================
// MOSTRAR
// =====================
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


// =====================
// RESPONDER
// =====================
function responder(op) {
  respostas[indice] = op;
  indice++;
  mostrar();
}


// =====================
// TIMER
// =====================
function iniciarTimer() {
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    tempo--;

    document.getElementById("timer").innerText =
      Math.floor(tempo / 60) + ":" + String(tempo % 60).padStart(2, "0");

    if (tempo <= 0) finalizar();
  }, 1000);
}


// =====================
// FINALIZAR
// =====================
function finalizar() {
  clearInterval(intervalo);

  let acertos = 0;

  questoes.forEach((q, i) => {
    if (respostas[i] === q.resposta) acertos++;
  });

  let total = questoes.length;
  let percentual = (acertos / total) * 100;

  document.getElementById("resultado").innerHTML = `
    <h2>${percentual >= 70 ? "APROVADO" : "REPROVADO"}</h2>
    <p>${percentual.toFixed(1)}%</p>
  `;
}


// =====================
// EMBARALHAR
// =====================
function embaralhar(a) {
  return a.sort(() => Math.random() - 0.5);
}

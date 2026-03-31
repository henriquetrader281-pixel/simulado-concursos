// =========================
// CONFIG GERAL
// =========================
let questoes = [];
let respostas = [];
let indice = 0;
let tempo = 60 * 60;
let intervalo;
let usuarioAtual = "";

const ADMIN = "admin123";
const USER = "aluno123";


// =========================
// LOGIN
// =========================
function validar() {
  const senha = document.getElementById("senha").value.trim();

  if (senha === ADMIN) usuarioAtual = "admin";
  else if (senha === USER) usuarioAtual = "aluno";
  else {
    alert("Senha inválida");
    return;
  }

  document.getElementById("senha").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.getElementById("sistema").style.display = "block";
}


// =========================
// BANCO DE QUESTÕES (NÍVEL PROVA)
// =========================
const bancoQuestoes = {

  // 🔵 BANCO DO BRASIL
  bb: [

    // Português
    {disciplina:"portugues", pergunta:"Assinale a frase correta:", opcoes:["Houveram erros","Houve erros","Houveram problema","Nenhuma"], resposta:1},
    {disciplina:"portugues", pergunta:"Uso correto da crase:", opcoes:["Vou a escola","Vou à escola","Vou à escola.","Errado"], resposta:1},

    // Matemática
    {disciplina:"matematica", pergunta:"10% de 800:", opcoes:["40","80","100","120"], resposta:1},
    {disciplina:"matematica", pergunta:"Juros simples: 200 a 10%:", opcoes:["10","20","30","40"], resposta:1},

    // Bancários
    {disciplina:"bancarios", pergunta:"PIX é:", opcoes:["Moeda","Pagamento instantâneo","Cartão","Banco"], resposta:1},
    {disciplina:"bancarios", pergunta:"Open Banking permite:", opcoes:["Compartilhar dados","Encerrar conta","Emitir boleto","NDA"], resposta:0},

    // Informática
    {disciplina:"informatica", pergunta:"Firewall serve para:", opcoes:["Jogo","Segurança","Tela","Teclado"], resposta:1},
    {disciplina:"informatica", pergunta:"Memória RAM é:", opcoes:["Memória temporária","HD","Processador","Rede"], resposta:0}
  ],

  // 🟢 FENAC
  fenac: [

    {disciplina:"informatica", pergunta:"CPU é:", opcoes:["Memória","Processador","HD","Fonte"], resposta:1},
    {disciplina:"informatica", pergunta:"Sistema operacional:", opcoes:["Windows","Mouse","Teclado","Monitor"], resposta:0},

    {disciplina:"logica", pergunta:"2,4,6,?", opcoes:["7","8","9","10"], resposta:1},
    {disciplina:"logica", pergunta:"1,3,5,?", opcoes:["6","7","8","9"], resposta:1},

    {disciplina:"portugues", pergunta:"Plural de pão:", opcoes:["Pãos","Pães","Pãeses","Pões"], resposta:1}
  ],

  // 🟠 PREFEITURA NH
  nh: [

    {disciplina:"portugues", pergunta:"Plural de cidadão:", opcoes:["Cidadões","Cidadãos","Cidadães","Cidadens"], resposta:1},
    {disciplina:"portugues", pergunta:"Antônimo de bom:", opcoes:["Ruim","Ótimo","Legal","Alto"], resposta:0},

    {disciplina:"logica", pergunta:"10,20,30,?", opcoes:["35","40","45","50"], resposta:1},
    {disciplina:"logica", pergunta:"5,10,15,?", opcoes:["20","25","30","35"], resposta:0}
  ]
};


// =========================
// CARREGAR PROVA (MODO REAL)
// =========================
function carregar() {
  const banco = document.getElementById("banco").value;

  let todas = bancoQuestoes[banco];

  if (!todas || todas.length === 0) {
    alert("Sem questões disponíveis");
    return;
  }

  // 🔥 simulado misto estilo prova
  questoes = embaralhar([...todas, ...todas, ...todas]).slice(0, 20);

  respostas = [];
  indice = 0;

  iniciarTimer();
  mostrar();
}


// =========================
// MOSTRAR QUESTÃO
// =========================
function mostrar() {
  const div = document.getElementById("quiz");

  if (indice >= questoes.length) {
    finalizar();
    return;
  }

  const q = questoes[indice];

  let html = `<div class="card">`;
  html += `<h3>${indice + 1}. ${q.pergunta}</h3>`;

  q.opcoes.forEach((opcao, i) => {
    html += `<button onclick="responder(${i})" style="margin:5px;padding:10px;width:100%">${opcao}</button>`;
  });

  html += `</div>`;

  div.innerHTML = html;
}


// =========================
// RESPONDER
// =========================
function responder(opcao) {
  respostas[indice] = opcao;
  indice++;

  setTimeout(() => {
    mostrar();
  }, 50);
}


// =========================
// TIMER
// =========================
function iniciarTimer() {
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    tempo--;

    document.getElementById("timer").innerText =
      "Tempo: " + Math.floor(tempo / 60) + ":" + String(tempo % 60).padStart(2, '0');

    if (tempo <= 0) finalizar();
  }, 1000);
}


// =========================
// FINALIZAR
// =========================
function finalizar() {
  clearInterval(intervalo);

  let acertos = 0;

  questoes.forEach((q, i) => {
    if (respostas[i] === q.resposta) acertos++;
  });

  let total = questoes.length;
  let erros = total - acertos;
  let percentual = (acertos / total) * 100;

  const banco = document.getElementById("banco").value;

  localStorage.setItem(
    usuarioAtual + "_" + banco,
    JSON.stringify({ acertos, erros, percentual })
  );

  let aprovado = percentual >= 70 ? "APROVADO ✅" : "REPROVADO ❌";

  document.getElementById("quiz").innerHTML = "";

  document.getElementById("resultado").innerHTML = `
    <div class="card">
      <h2>Resultado Final</h2>
      <p>Acertos: ${acertos}</p>
      <p>Erros: ${erros}</p>
      <p>Aproveitamento: ${percentual.toFixed(1)}%</p>
      <h3>${aprovado}</h3>
    </div>
  `;
}


// =========================
// HISTÓRICO
// =========================
function verHistorico() {
  const banco = document.getElementById("banco").value;

  const dados = localStorage.getItem(usuarioAtual + "_" + banco);

  if (!dados) {
    alert("Sem histórico");
    return;
  }

  const r = JSON.parse(dados);

  alert(
    `Acertos: ${r.acertos}\nErros: ${r.erros}\nAproveitamento: ${r.percentual.toFixed(1)}%`
  );
}


// =========================
// EMBARALHAR
// =========================
function embaralhar(a) {
  return a.sort(() => Math.random() - 0.5);
}


// =========================
// ENTER PARA LOGAR
// =========================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("senha").addEventListener("keypress", function(e) {
    if (e.key === "Enter") validar();
  });
});

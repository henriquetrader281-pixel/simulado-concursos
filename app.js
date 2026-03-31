let questoes = [];
let respostas = [];
let indice = 0;
let tempo = 60 * 60;
let intervalo;
let usuarioAtual = "";

const ADMIN = "admin123";
const USER = "aluno123";

// 🔐 LOGIN
function validar() {
  const senha = document.getElementById("senha").value;

  if (senha === ADMIN) {
    usuarioAtual = "admin";
  } else if (senha === USER) {
    usuarioAtual = "aluno";
  } else {
    alert("Senha inválida");
    return;
  }

  document.getElementById("sistema").style.display = "block";
}

// 🚀 CARREGAR QUESTÕES (SEM JSON)
async function carregar() {
  try {
    const banco = document.getElementById("banco").value;
    const disciplina = document.getElementById("disciplina").value;

    const bancoQuestoes = {

      bb: [
        { disciplina: "portugues", pergunta: "Uso correto da crase:", opcoes: ["Vou a escola", "Vou à escola", "Errado", "Nenhuma"], resposta: 1 },
        { disciplina: "bancarios", pergunta: "O que é PIX?", opcoes: ["Moeda", "Pagamento instantâneo", "Cartão", "Banco"], resposta: 1 },
        { disciplina: "matematica", pergunta: "10% de 200 é:", opcoes: ["10", "20", "30", "40"], resposta: 1 }
      ],

      fenac: [
        { disciplina: "logica", pergunta: "Se 2+2=4, então:", opcoes: ["Verdadeiro", "Falso", "Erro", "Nenhum"], resposta: 0 },
        { disciplina: "informatica", pergunta: "O que é CPU?", opcoes: ["Memória", "Processador", "HD", "Fonte"], resposta: 1 }
      ],

      nh: [
        { disciplina: "portugues", pergunta: "Plural de cidadão:", opcoes: ["Cidadões", "Cidadãos", "Cidadães", "Cidadens"], resposta: 1 },
        { disciplina: "logica", pergunta: "Sequência: 2,4,6,?", opcoes: ["7", "8", "9", "10"], resposta: 1 }
      ]
    };

    let todas = bancoQuestoes[banco];

    if (disciplina !== "todas") {
      todas = todas.filter(q => q.disciplina === disciplina);
    }

    if (!todas || todas.length === 0) {
      alert("Sem questões para essa disciplina");
      return;
    }

    questoes = embaralhar(todas).slice(0, 20);
    respostas = [];
    indice = 0;

    iniciarTimer();
    mostrar();

  } catch (e) {
    alert("Erro ao carregar questões");
    console.error(e);
  }
}

// 📄 MOSTRAR QUESTÃO
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

// 👉 RESPONDER
function responder(respostaEscolhida) {
  respostas[indice] = respostaEscolhida;
  indice++;
  mostrar();
}

// ⏱️ TIMER
function iniciarTimer() {
  clearInterval(intervalo);
  tempo = 60 * 60;

  intervalo = setInterval(() => {
    tempo--;

    document.getElementById("timer").innerText =
      "Tempo: " + Math.floor(tempo / 60) + ":" + String(tempo % 60).padStart(2, '0');

    if (tempo <= 0) finalizar();
  }, 1000);
}

// 🧮 FINALIZAR
function finalizar() {
  clearInterval(intervalo);

  let acertos = 0;

  questoes.forEach((q, i) => {
    if (respostas[i] === q.resposta) acertos++;
  });

  let total = questoes.length;
  let erros = total - acertos;
  let percentual = (acertos / total) * 100;

  // 💾 SALVAR POR USUÁRIO
  const banco = document.getElementById("banco").value;
  const disciplina = document.getElementById("disciplina").value;

  localStorage.setItem(
    usuarioAtual + "_" + banco + "_" + disciplina,
    JSON.stringify({ acertos, erros, percentual })
  );

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

// 📊 HISTÓRICO
function verHistorico() {
  const banco = document.getElementById("banco").value;
  const disciplina = document.getElementById("disciplina").value;

  const dados = localStorage.getItem(usuarioAtual + "_" + banco + "_" + disciplina);

  if (!dados) {
    alert("Sem histórico ainda");
    return;
  }

  const r = JSON.parse(dados);

  alert(
    `Último resultado:\nAcertos: ${r.acertos}\nErros: ${r.erros}\nAproveitamento: ${r.percentual.toFixed(1)}%`
  );
}

// 🔀 EMBARALHAR
function embaralhar(a) {
  return a.sort(() => Math.random() - 0.5);
}

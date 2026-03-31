let questoes = [];
let respostas = [];
let tempo = 60 * 60;
let intervalo;

async function carregar() {
  try {
    const res = await fetch('./data/fenac_01.json');
    const data = await res.json();

    questoes = embaralhar(data).slice(0, 10);
    respostas = [];

    mostrar();
    iniciarTimer();

  } catch (e) {
    alert("Erro ao carregar questões");
    console.error(e);
  }
}

function mostrar() {
  const div = document.getElementById("quiz");
  div.innerHTML = "";

  questoes.forEach((q, i) => {
    div.innerHTML += `
      <div class="card">
        <p>${i+1}. ${q.pergunta}</p>
        ${q.opcoes.map((o,j)=>
          `<label><input type="radio" name="q${i}" onclick="responder(${i},${j})"> ${o}</label>`
        ).join("")}
      </div>
    `;
  });
}

function responder(i,j){
  respostas[i] = j;
}

function iniciarTimer(){
  intervalo = setInterval(()=>{
    tempo--;
    document.getElementById("timer").innerText =
      "Tempo: " + Math.floor(tempo/60) + ":" + (tempo%60);

    if(tempo <= 0) finalizar();
  },1000);
}

function finalizar(){
  clearInterval(intervalo);

  let acertos = 0;
  questoes.forEach((q,i)=>{
    if(respostas[i] === q.resposta) acertos++;
  });

  let pct = (acertos/questoes.length)*100;

  document.getElementById("resultado").innerHTML =
    `Acertos: ${acertos} / ${questoes.length} <br> ${pct.toFixed(1)}%`;
}

function embaralhar(a){
  return a.sort(()=>Math.random()-0.5);
}

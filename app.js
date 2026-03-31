async function carregar() {
  try {
    const banco = document.getElementById("banco").value;
    const disciplina = document.getElementById("disciplina").value;

    const res = await fetch(`./data/${banco}_01.json`);
    const data = await res.json();

    let filtradas = data;

    if (disciplina !== "todas") {
      filtradas = data.filter(q => q.disciplina === disciplina);
    }

    questoes = embaralhar(filtradas).slice(0, 20);

    respostas = [];
    indice = 0;

    iniciarTimer();
    mostrar();

  } catch (e) {
    alert("Erro ao carregar questões");
    console.error(e);
  }
}

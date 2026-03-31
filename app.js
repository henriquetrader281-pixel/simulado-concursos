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

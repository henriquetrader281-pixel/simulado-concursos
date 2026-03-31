function validar() {
  const senha = document.getElementById("senha").value.trim();

  console.log("Digitado:", senha);

  if (senha === ADMIN) {
    usuarioAtual = "admin";
  } else if (senha === USER) {
    usuarioAtual = "aluno";
  } else {
    alert("Senha inválida");
    return;
  }

  // 🔥 ESCONDE LOGIN (melhora UX)
  document.getElementById("senha").style.display = "none";
  document.querySelector("button").style.display = "none";

  // 🔥 MOSTRA SISTEMA
  document.getElementById("sistema").style.display = "block";

  alert("Login realizado com sucesso!");
}

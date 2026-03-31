async function carregar() {
  try {
    const banco = document.getElementById("banco").value;
    const disciplina = document.getElementById("disciplina").value;

    // 🔥 BANCO DE QUESTÕES DIRETO NO CÓDIGO
    const bancoQuestoes = {
      
      bb: [
        {
          disciplina: "portugues",
          pergunta: "Uso correto da crase:",
          opcoes: ["Vou a escola", "Vou à escola", "Errado", "Nenhuma"],
          resposta: 1
        },
        {
          disciplina: "bancarios",
          pergunta: "O que é PIX?",
          opcoes: ["Moeda", "Pagamento instantâneo", "Cartão", "Banco"],
          resposta: 1
        },
        {
          disciplina: "matematica",
          pergunta: "10% de 200 é:",
          opcoes: ["10", "20", "30", "40"],
          resposta: 1
        }
      ],

      fenac: [
        {
          disciplina: "logica",
          pergunta: "Se 2+2=4, então:",
          opcoes: ["Verdadeiro", "Falso", "Erro", "Nenhum"],
          resposta: 0
        },
        {
          disciplina: "informatica",
          pergunta: "O que é CPU?",
          opcoes: ["Memória", "Processador", "HD", "Fonte"],
          resposta: 1
        }
      ],

      nh: [
        {
          disciplina: "portugues",
          pergunta: "Plural de cidadão:",
          opcoes: ["Cidadões", "Cidadãos", "Cidadães", "Cidadens"],
          resposta: 1
        },
        {
          disciplina: "logica",
          pergunta: "Sequência: 2,4,6,?",
          opcoes: ["7", "8", "9", "10"],
          resposta: 1
        }
      ]
    };

    let todas = bancoQuestoes[banco];

    // 🔍 FILTRO POR DISCIPLINA
    if (disciplina !== "todas") {
      todas = todas.filter(q => q.disciplina === disciplina);
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

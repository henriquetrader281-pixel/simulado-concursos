export default async function handler(req, res) {

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Gere 10 questões de concurso público.
Formato JSON:
[
 { "disciplina":"matematica","pergunta":"...","opcoes":["A","B","C","D"],"resposta":0 }
]
`
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json(data);
}

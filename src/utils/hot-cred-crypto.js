// HotcredTest.js

export async function enviarParaAPI() {
  const url = "https://api.hotcred.com.br/api/seja-parceiro";

  // 🔹 Estes são os parâmetros que vão na URL
  const params = {
    h: "0206463d294442541f6119f7316269b41e2ca26095fc66851fb469fe07e9b66e",
    p: "82cd3898",
    d: "eyJpZF9jb3JiYW5fbWFya2V0aW5nIjoxLCJpZF9jb3JiYW4iOjM1LCJub21lX2NhbXBhbmhhIjoiQ2FtcGFuaGEgVGVzdGUiLCJleHBpcmFjYW8iOiIyMDI1LTEwLTA5VDAzOjAwOjAwLjAwMFoiLCJ0aW1lc3RhbXAiOjE3NTgyODQwOTIsImxpbmtJZCI6IjgyY2QzODk4In0=",
    cpf: "757.580.730-67",
    nome: "MatheusPM Teste",
    sexo: 1,
    telefone: "31998072869",
    email: "matheuspm2006@gmail.com",
    nome_fantasia: "empresa tes6",
    razao_social: "Teste ltd489",
    cep: "32671632",
    endereco: "R. Pedro Rodrigues Laranjeiras",
    numero: "273",
    bairro: "Espirito Santo",
    cidade: "Betim",
    estado: "MG",
    banco: "237",
    agencia: "1548",
    conta: "21584",
    tipo_chave_pix: "cpf",
    chave_pix: "02238056610",
    cnpj: "50.744.699/0001-77",
  };

  // 🔹 Converte o objeto em query string
  const queryString = new URLSearchParams(params).toString();

  // 🔹 URL final que vai para a API
  const finalUrl = `${url}?${queryString}`;

  console.log("🔵 Enviando requisição para:");
  console.log(finalUrl);

  try {
    // 🔹 Requisição GET
    const response = await fetch(finalUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });

    const json = await response.json();

    console.log("RESPOSTA DA API:", json);
  } catch (error) {
    console.error("ERRO AO ENVIAR:", error);
  }
}

// index.ts
import fetch from "node-fetch";

async function main() {
  const url = "https://api.hotcred.com.br/api/seja-parceiro"
    + "?h=8cb0b9816d5e0c5f179ac947a2b16494a3010adc79742db53d22fc01e7ec2a7c"
    + "&p=15947da0"
    + "&d=eyJpZF9jb3JiYW5fbWFya2V0aW5nIjoxLCJpZF9jb3JiYW4iOjEsIm5vbWVfY2FtcGFuaGEiOiJDYW1wYW5oYSBQcmluY2lwYWwiLCJleHBpcmFjYW8iOm51bGwsInRpbWVzdGFtcCI6MTc2NDY3OTgwNCwibGlua0lkIjoiMTU5NDdkYTAifQ=="
    // --- dados fictícios ---
    + "&cpf=481.848.388-59"
    + "&nome=Joao Teste"
    + "&sexo=1"
    + "&telefone=31999990000"
    + "&email=joao.teste%40email.com"
    + "&nome_fantasia=Empresa%20Ficticia"
    + "&razao_social=Empresa%20Ficticia%20LTDA"
    + "&cep=30140071"
    + "&endereco=Rua%20Exemplo"
    + "&numero=123"
    + "&bairro=Centro"
    + "&cidade=Belo%20Horizonte"
    + "&estado=MG"
    + "&banco=237"
    + "&agencia=1234"
    + "&conta=98765"
    + "&tipo_chave_pix=cpf"
    + "&chave_pix=12345678900"
    + "&cnpj=12.345.678%2F0001-99";

  console.log("🔵 Enviando para:");
  console.log(url);

  const response = await fetch(url, {
    method: "POST",
  });

  const text = await response.text();
  console.log("🔵 Status:", response.status);
  console.log("🟢 Resposta:", text);
}

main().catch(console.error);

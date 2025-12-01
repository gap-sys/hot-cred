// HotcredTest.js
import fetch from "node-fetch";
import CryptoJS from "crypto-js";

// ================================
// 1. Classe de criptografia AES-256-CBC
// ================================
class HotcredCrypto {
  constructor() {
    this.secretKey = CryptoJS.enc.Utf8.parse(
      "i1A7Limrkqh5rU8qsS51XL6smfRx8sbvkA9hlAlqNiMUlf4wdD"
    );
  }

  encrypt(data) {
    const json = JSON.stringify(data);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(json, this.secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return iv.toString(CryptoJS.enc.Base64) + ":" + encrypted.toString();
  }

  decrypt(text) {
    try {
      const [ivBase64, encryptedData] = text.split(":");
      const iv = CryptoJS.enc.Base64.parse(ivBase64);
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  }
}

const hotcredCrypto = new HotcredCrypto();

// ================================
// 2. Função para enviar requisição
// ================================
export async function enviarParaAPI() {
  // 🔹 Payload que a API espera
  const payload = {
    id_corban_marketing: 1,
    id_corban: 35,
    nome_campanha: "Campanha Teste",
    expiracao: "2025-10-09T03:00:00.000Z",
    timestamp: Math.floor(Date.now() / 1000),
    linkId: "82cd3898",
  };

  // 🔹 Criptografa o payload
  const d = hotcredCrypto.encrypt(payload);

  // 🔹 Outros dados obrigatórios
  const params = {
    h: "0206463d294442541f6119f7316269b41e2ca26095fc66851fb469fe07e9b66e",
    p: "82cd3898",
    d: encodeURIComponent(d), // envia o d gerado
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

  const url = "https://api.hotcred.com.br/api/seja-parceiro";
  console.log("🔵 Enviando requisição para a API...");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const json = await response.json();
    console.log("✅ RESPOSTA DA API:", json);
  } catch (error) {
    console.error("❌ ERRO AO ENVIAR:", error);
  }
}

// ================================
// 3. Executa a função
// ================================
enviarParaAPI();

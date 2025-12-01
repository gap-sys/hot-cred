// ================================
// 1. Importa o crypto-js
// ================================
import CryptoJS from "crypto-js";

// ================================
// 2. Classe que faz criptografia AES-256-CBC
// ================================

class HotcredCrypto {
  constructor() {
    // Esta chave É EXATAMENTE a enviada pelo backend
    // Ela deve ter 32 bytes para AES-256
    this.secretKey = CryptoJS.enc.Utf8.parse(
      "i1A7Limrkqh5rU8qsS51XL6smfRx8sbvkA9hlAlqNiMUlf4wdD"
    );
  }

  // ------------------------------------------------
  // 3. Criptografa o objeto JSON no padrão do backend
  // ------------------------------------------------
  encrypt(data) {
    try {
      // Converte o objeto para texto
      const json = JSON.stringify(data);

      // IV de 16 bytes aleatório (obrigatório p/ CBC)
      const iv = CryptoJS.lib.WordArray.random(16);

      // Criptografia AES
      const encrypted = CryptoJS.AES.encrypt(json, this.secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Formato final exigido pela API:
      // base64(iv) : base64(criptografia)
      return iv.toString(CryptoJS.enc.Base64) + ":" + encrypted.toString();
    } catch (e) {
      console.error("ERRO NA CRIPTOGRAFIA:", e);
      return null;
    }
  }

  // ------------------------------------------------
  // 4. Descriptografa para testar (opcional)
  // ------------------------------------------------
  decrypt(text) {
    try {
      const [ivBase64, encrypted] = text.split(":");

      const iv = CryptoJS.enc.Base64.parse(ivBase64);

      const decrypted = CryptoJS.AES.decrypt(encrypted, this.secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error("Erro ao descriptografar");
      return null;
    }
  }
}

// Exporta
export const hotcredCrypto = new HotcredCrypto();

// ================================
// 5. EXEMPLO: GERAR O D E PRINTAR
// ================================

export function gerarD() {
  const payload = {
    id_corban_marketing: 1,
    id_corban: 35,
    nome_campanha: "Campanha Teste",
    expiracao: "2025-10-09T03:00:00.000Z",

    // SEMPRE coloque timestamp atual
    timestamp: Math.floor(Date.now() / 1000),

    linkId: "82cd3898",
  };

  // Criptografa
  const d = hotcredCrypto.encrypt(payload);

  console.log("\n===== D GERADO =====\n");
  console.log(d);
  console.log("\n=====================\n");

  return d;
}

// ================================
// 6. EXEMPLO: ENVIAR PARA API
// ================================

export async function enviarParaAPI() {
  const d = gerarD(); // já gera e retorna

  // IMPORTANTE: nunca envie d sem encodeURIComponent()
  const dEncoded = encodeURIComponent(d);

  const url = `https://api.hotcred.com.br/api/seja-parceiro?h=0206463d2944&p=82cd3898&d=${dEncoded}`;

  const body = {
    cpf: "757.580.730-67",
    nome: "MatheusPM Teste",
    sexo: 1,
    telefone: "31998072869",
    email: "matheuspm2006@gmail.com",
    nome_fantasia: "Empresa Tes6",
    razao_social: "Teste Ltd489",
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

  console.log("\nENVIANDO PARA API...\n");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  console.log("RESPOSTA DA API:", json);
}

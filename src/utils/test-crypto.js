// test-crypto.js
import fetch from "node-fetch";
import CryptoJS from "crypto-js";

// ================================
// 1️⃣ Classe de Criptografia AES-256-CBC
// ================================
class HotcredCrypto {
  constructor() {
    // CHAVE enviada pelo backend
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
  
    // Use encrypted.toString() completo
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
    } catch (e) {
      console.error("Erro ao descriptografar:", e);
      return null;
    }
  }
}

const hotcredCrypto = new HotcredCrypto();

// ================================
// 2️⃣ Payload de teste
// ================================
const payload = {
  id_corban_marketing: 1,
  id_corban: 35,
  nome_campanha: "Campanha Teste",
  expiracao: "2025-10-09T03:00:00.000Z",
  timestamp: Math.floor(Date.now() / 1000),
  linkId: "82cd3898",
};

// ================================
// 3️⃣ Criptografar
// ================================
const d = hotcredCrypto.encrypt(payload);
console.log("D GERADO:\n", d);

// ================================
// 4️⃣ Descriptografar para teste
// ================================
const decrypted = hotcredCrypto.decrypt(d);
console.log("\nD DESCRIPTOGRAFADO:\n", decrypted);

// ================================
// 5️⃣ Enviar para endpoint de autenticação (opcional)
// ================================
async function enviarParaAutenticar() {
  const url = "https://api.hotcred.com.br/api/seja-parceiro/autenticar";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dados: d }),
    });

    let json;
    try {
      json = await response.json();
    } catch {
      json = await response.text();
    }

    console.log("\nRESPOSTA DA API:\n", json);
  } catch (error) {
    console.error("Erro ao enviar para a API:", error);
  }
}

// Chame a função se quiser testar envio
// enviarParaAutenticar();

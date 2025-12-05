import { NextResponse } from "next/server";
import axios from "axios";
import CryptoJS from "crypto-js";

function criptografar(dados: any, chave: string) {
  const json = JSON.stringify(dados);
  const key = CryptoJS.enc.Utf8.parse(chave);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(json, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const combinado = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combinado);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const form = body?.form || body;
    const urlBase =
      process.env.SEJA_PARCEIRO_URL ||
      "https://hapi.hotcred.com.br/api/seja-parceiro";
    const cryptoKey =
      process.env.SEJA_PARCEIRO_CRIPTO ||
      "i1A7Limrkqh5rU8qsS51XL6smfRx8sbvkA9hlAlqNiMUlf4wdD";
    const data = {
      cpf: String(form.cpf || "").replace(/\D/g, ""),
      nome: form.fullName,
      sexo: "1",
      telefone: String(form.whatsapp || "").replace(/\D/g, ""),
      email: form.email,
      nome_fantasia: form.nomeFantasia,
      razao_social: form.razaoSocial,
      cep: form.cep,
      endereco: form.endereco,
      numero: form.numero,
      bairro: form.bairro,
      cidade: form.cidade,
      estado: form.estado,
      banco: form.banco || "237",
      agencia: form.agencia || "1548",
      conta: form.conta || "21584",
      tipo_chave_pix: form.tipo_chave_pix || "cpf",
      chave_pix: form.chave_pix || String(form.cpf || "").replace(/\D/g, ""),
      cnpj: String(form.cnpj || "").replace(/\D/g, ""),
    };
    const dados = cryptoKey ? criptografar(data, cryptoKey) : null;
    console.log("[seja-parceiro] data", data);
    console.log("[seja-parceiro] dados_len", dados ? dados.length : 0);
    const u = new URL(req.url);
    const sp = u.searchParams;
    const hParam =
      sp.get("h") ||
      "0368d36026ac6c3214ca19b8935db5563eca8a12d3908e02bd5d90bcd9faca63";
    const pParam = sp.get("p") || "5e583501";
    const dParam =
      sp.get("d") ||
      "eyJpZF9jb3JiYW5fbWFya2V0aW5nIjo1LCJpZF9jb3JiYW4iOjEsInNlamFfcGFyY2Vpcm8iOjIsImlkX3RpcG9fY29yYmFuIjozLCJub21lX2NhbXBhbmhhIjoiQ2FtcGFuaGEgdGVzdGUiLCJleHBpcmFjYW8iOm51bGwsInRpbWVzdGFtcCI6MTc2NDc4NTcxMywibGlua0lkIjoiNWU1ODM1MDEifQ==";
    const baseQuery = `?h=${encodeURIComponent(hParam)}&p=${encodeURIComponent(
      pParam
    )}&d=${encodeURIComponent(dParam)}`;
    const rawQuery =
      "&cpf=" +
      encodeURIComponent(data.cpf) +
      "&nome=" +
      encodeURIComponent(data.nome) +
      "&sexo=" +
      encodeURIComponent(data.sexo) +
      "&telefone=" +
      encodeURIComponent(data.telefone) +
      "&email=" +
      encodeURIComponent(data.email) +
      "&nome_fantasia=" +
      encodeURIComponent(data.nome_fantasia) +
      "&razao_social=" +
      encodeURIComponent(data.razao_social) +
      "&cep=" +
      encodeURIComponent(data.cep) +
      "&endereco=" +
      encodeURIComponent(data.endereco) +
      "&numero=" +
      encodeURIComponent(data.numero) +
      "&bairro=" +
      encodeURIComponent(data.bairro) +
      "&cidade=" +
      encodeURIComponent(data.cidade) +
      "&estado=" +
      encodeURIComponent(data.estado) +
      "&banco=" +
      encodeURIComponent(data.banco) +
      "&agencia=" +
      encodeURIComponent(data.agencia) +
      "&conta=" +
      encodeURIComponent(data.conta) +
      "&tipo_chave_pix=" +
      encodeURIComponent(data.tipo_chave_pix) +
      "&chave_pix=" +
      encodeURIComponent(data.chave_pix) +
      "&cnpj=" +
      encodeURIComponent(data.cnpj);
    const url =
      urlBase +
      baseQuery +
      (dados ? "&dados=" + encodeURIComponent(dados) : "") +
      rawQuery;
    console.log("[seja-parceiro] url", url);
    const resp = await axios.post(url);
    console.log("[seja-parceiro] status", resp.status);
    try {
      const preview =
        typeof resp.data === "string"
          ? resp.data.slice(0, 200)
          : JSON.stringify(resp.data).slice(0, 200);
      console.log("[seja-parceiro] body_preview", preview);
    } catch {}
    return NextResponse.json(resp.data, { status: resp.status || 200 });
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data || { error: "Falha ao enviar cadastro" };
    console.error("[seja-parceiro] error_status", status);
    try {
      const preview =
        typeof data === "string"
          ? data.slice(0, 300)
          : JSON.stringify(data).slice(0, 300);
      console.error("[seja-parceiro] error_body_preview", preview);
    } catch {}
    return NextResponse.json(data, { status });
  }
}

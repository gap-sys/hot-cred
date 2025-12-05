import { NextResponse } from "next/server";

import axios from "axios";

const VALIDAR_CPF_URL =
  process.env.VALIDAR_CPF_URL || "https://hapi.hotcred.com.br/api/validar-cpf";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cpf = (searchParams.get("cpf") || "").replace(/\D/g, "");
    if (!cpf || cpf.length !== 11) {
      return NextResponse.json(
        { valido: false, existe: false, mensagem: "CPF inválido" },
        { status: 400 }
      );
    }
    const url = `${VALIDAR_CPF_URL}?cpf=${cpf}`;
    console.log("[validar-cpf] url", url);
    const resp = await axios.get(url, {
      validateStatus: () => true,
      timeout: 8000,
    });
    console.log("[validar-cpf] status", resp.status);
    if (resp.status >= 200 && resp.status < 300) {
      return NextResponse.json(resp.data, { status: 200 });
    }
    if (resp.status === 404) {
      return NextResponse.json(
        { valido: true, existe: false, mensagem: "CPF não encontrado" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CPF indisponível",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[validar-cpf] error", String(error));
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CPF indisponível",
        details: String(error),
      },
      { status: 200 }
    );
  }
}

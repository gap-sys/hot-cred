import { NextResponse } from "next/server";

import axios from "axios";

const VALIDAR_CNPJ_URL =
  process.env.VALIDAR_CNPJ_URL ||
  "https://hapi.hotcred.com.br/api/validar-cnpj";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cnpj = (searchParams.get("cnpj") || "").replace(/\D/g, "");
    if (!cnpj || cnpj.length !== 14) {
      return NextResponse.json(
        { valido: false, existe: false, mensagem: "CNPJ inválido" },
        { status: 400 }
      );
    }
    const url = `${VALIDAR_CNPJ_URL}?cnpj=${cnpj}`;
    console.log("[validar-cnpj] url", url);
    const resp = await axios.get(url, {
      validateStatus: () => true,
      timeout: 8000,
    });
    console.log("[validar-cnpj] status", resp.status);
    if (resp.status >= 200 && resp.status < 300) {
      return NextResponse.json(resp.data, { status: 200 });
    }
    if (resp.status === 404) {
      return NextResponse.json(
        { valido: true, existe: false, mensagem: "CNPJ não encontrado" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CNPJ indisponível",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[validar-cnpj] error", String(error));
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CNPJ indisponível",
        details: String(error),
      },
      { status: 200 }
    );
  }
}

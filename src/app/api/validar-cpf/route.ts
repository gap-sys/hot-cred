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
    const resp = await axios.get(url);
    return NextResponse.json(resp.data, { status: resp.status || 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CPF indisponível",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

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
    const base =
      process.env.VALIDAR_CPF_ENDPOINT ||
      "http://localhost:8000/api/seja-parceiro/validar-cpf";
    const url = `${base}?cpf=${cpf}`;
    const resp = await fetch(url, { cache: "no-store" });
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status || 200 });
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

import { NextResponse } from "next/server";

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

    const base =
      process.env.VALIDAR_CNPJ_ENDPOINT ||
      "http://localhost:8000/api/seja-parceiro/validar-cnpj";
    const url = `${base}?cnpj=${cnpj}`;

    const resp = await fetch(url, { cache: "no-store" });
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status || 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        valido: false,
        existe: false,
        mensagem: "Validação de CNPJ indisponível",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

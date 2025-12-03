import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cep } = await req.json();
    if (!cep) {
      return NextResponse.json({ error: "CEP não informado" }, { status: 400 });
    }
    const raw = String(cep).replace(/\D/g, "");
    const brasilRes = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${raw}`,
      { cache: "no-store" }
    );
    const brasilData = await brasilRes.json();
    if (!brasilRes.ok) {
      return NextResponse.json(
        { error: "CEP não encontrado" },
        { status: 404 }
      );
    }
    const unified = {
      logradouro: brasilData?.street || "",
      bairro: brasilData?.neighborhood || "",
      localidade: brasilData?.city || "",
      uf: brasilData?.state || "",
    };
    return NextResponse.json(unified, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao consultar CEP", details: String(error) },
      { status: 500 }
    );
  }
}

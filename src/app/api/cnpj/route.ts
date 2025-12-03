import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cnpj } = await req.json();
    if (!cnpj) {
      return NextResponse.json(
        { error: "CNPJ não fornecido" },
        { status: 400 }
      );
    }
    const clean = String(cnpj).replace(/\D/g, "");
    const res = await fetch(`https://publica.cnpj.ws/cnpj/${clean}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      return NextResponse.json(
        {
          error: true,
          message: "CNPJ não encontrado na base da Receita Federal",
        },
        { status: 404 }
      );
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: true, message: "Erro ao consultar CNPJ" },
        { status: res.status }
      );
    }
    const data = await res.json();
    const formatted = {
      razao_social: data?.razao_social || "",
      nome_fantasia: data?.nome_fantasia || "",
      logradouro: data?.estabelecimento?.logradouro || "",
      numero: data?.estabelecimento?.numero || "",
      bairro: data?.estabelecimento?.bairro || "",
      cep: data?.estabelecimento?.cep || "",
      cidade: data?.estabelecimento?.cidade?.nome || "",
      uf: data?.estabelecimento?.estado?.sigla || "",
      complemento: data?.estabelecimento?.complemento || "",
      telefone: data?.estabelecimento?.telefone1 || "",
      email: data?.estabelecimento?.email || "",
    };
    return NextResponse.json(formatted, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: "Erro ao consultar CNPJ",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

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
    if (clean.length !== 14) {
      return NextResponse.json(
        { error: true, message: "CNPJ inválido" },
        { status: 400 }
      );
    }

    const fetchPublica = async () => {
      const res = await fetch(`https://publica.cnpj.ws/cnpj/${clean}`, {
        cache: "no-store",
      });
      if (!res.ok) return { ok: false, status: res.status } as const;
      const data = await res.json();
      const formatted = {
        razao_social: data?.razao_social || "",
        nome_fantasia: data?.nome_fantasia || "",
        logradouro: data?.estabelecimento?.logradouro || "",
        numero: data?.estabelecimento?.numero || "",
        bairro: data?.estabelecimento?.bairro || "",
        cep: (data?.estabelecimento?.cep || "").replace(/\D/g, ""),
        cidade: data?.estabelecimento?.cidade?.nome || "",
        uf: data?.estabelecimento?.estado?.sigla || "",
        complemento: data?.estabelecimento?.complemento || "",
        telefone: data?.estabelecimento?.telefone1 || "",
        email: data?.estabelecimento?.email || "",
      };
      return { ok: true, status: 200, data: formatted } as const;
    };

    const fetchBrasilApi = async () => {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`, {
        cache: "no-store",
      });
      if (!res.ok) return { ok: false, status: res.status } as const;
      const data = await res.json();
      const formatted = {
        razao_social: data?.razao_social || "",
        nome_fantasia: data?.nome_fantasia || "",
        logradouro: data?.logradouro || "",
        numero: data?.numero || "",
        bairro: data?.bairro || "",
        cep: (data?.cep || "").replace(/\D/g, ""),
        cidade: data?.municipio || data?.cidade || "",
        uf: data?.uf || "",
        complemento: data?.complemento || "",
        telefone: data?.ddd_telefone_1 || data?.telefone || "",
        email: data?.email || "",
      };
      return { ok: true, status: 200, data: formatted } as const;
    };

    const primary = await fetchPublica();
    if (primary.ok) return NextResponse.json(primary.data, { status: 200 });

    const fallback = await fetchBrasilApi();
    if (fallback.ok) return NextResponse.json(fallback.data, { status: 200 });

    const status = primary.status || fallback.status || 500;
    if (status === 404) {
      return NextResponse.json(
        { error: true, message: "CNPJ não encontrado" },
        { status }
      );
    }
    return NextResponse.json(
      { error: true, message: "Erro ao consultar CNPJ" },
      { status }
    );
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

import { NextResponse } from "next/server";

const cnpjCache = new Map<
  string,
  { status: number; data: any; expires: number }
>();
const CACHE_TTL_MS = Number(process.env.CNPJ_CACHE_TTL_MS || 300000);

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

    const now = Date.now();
    const key = clean;
    const cached = cnpjCache.get(key);
    if (cached && cached.expires > now) {
      return NextResponse.json(cached.data, { status: cached.status });
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
    if (primary.ok) {
      cnpjCache.set(key, {
        status: 200,
        data: primary.data,
        expires: now + CACHE_TTL_MS,
      });
      return NextResponse.json(primary.data, { status: 200 });
    }

    const fallback = await fetchBrasilApi();
    if (fallback.ok) {
      cnpjCache.set(key, {
        status: 200,
        data: fallback.data,
        expires: now + CACHE_TTL_MS,
      });
      return NextResponse.json(fallback.data, { status: 200 });
    }

    const status = primary.status || fallback.status || 500;
    const dataResp =
      status === 404
        ? { error: true, message: "CNPJ não encontrado" }
        : { error: true, message: "Erro ao consultar CNPJ" };
    cnpjCache.set(key, { status, data: dataResp, expires: now + CACHE_TTL_MS });
    return NextResponse.json(dataResp, { status });
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

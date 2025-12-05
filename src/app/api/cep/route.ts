import { NextResponse } from "next/server";

import axios from "axios";

const BRASIL_API_CEP_URL = "https://brasilapi.com.br/api/cep/v1";

export async function POST(req: Request) {
  try {
    const { cep } = await req.json();
    if (!cep) {
      return NextResponse.json({ error: "CEP não informado" }, { status: 400 });
    }
    const raw = String(cep).replace(/\D/g, "");
    try {
      const resp = await axios.get(`${BRASIL_API_CEP_URL}/${raw}`);
      const brasilData = resp.data;
      const unified = {
        logradouro: brasilData?.street || "",
        bairro: brasilData?.neighborhood || "",
        localidade: brasilData?.city || "",
        uf: brasilData?.state || "",
      };
      return NextResponse.json(unified, { status: 200 });
    } catch (e: any) {
      return NextResponse.json(
        { error: "CEP não encontrado" },
        { status: e?.response?.status || 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao consultar CEP", details: String(error) },
      { status: 500 }
    );
  }
}

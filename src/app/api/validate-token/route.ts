import { NextResponse } from "next/server";

import axios from "axios";

const VALIDATE_TOKEN_URL =
  process.env.VALIDATE_TOKEN_URL ||
  "https://hapi.hotcred.com.br/api/validate-token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawPhone = body?.telefone ?? body?.phone;
    const token = String(body?.token || "").replace(/\D/g, "");
    const telefone = String(rawPhone || "").replace(/\D/g, "");
    if (!telefone || telefone.length < 10) {
      return NextResponse.json(
        { ok: false, message: "Telefone inválido" },
        { status: 400 }
      );
    }
    if (!token || token.length !== 6) {
      return NextResponse.json(
        { ok: false, message: "Código inválido" },
        { status: 400 }
      );
    }

    const resp = await axios.post(VALIDATE_TOKEN_URL, { telefone, token });
    return NextResponse.json(resp.data, { status: resp.status || 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: "Falha ao validar token", details: String(error) },
      { status: 500 }
    );
  }
}

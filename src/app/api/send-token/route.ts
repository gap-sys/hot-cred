import { NextResponse } from "next/server";
import axios from "axios";

const SEND_TOKEN_URL =
  process.env.SEND_TOKEN_URL || "https://hapi.hotcred.com.br/api/send-token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const raw = body?.telefone ?? body?.phone;
    const digits = String(raw || "").replace(/\D/g, "");
    if (!digits || digits.length < 10) {
      return NextResponse.json(
        { ok: false, message: "Telefone inválido" },
        { status: 400 }
      );
    }

    const resp = await axios.post(SEND_TOKEN_URL, { telefone: digits });
    return NextResponse.json(resp.data, { status: resp.status || 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: "Falha ao enviar token", details: String(error) },
      { status: 500 }
    );
  }
}

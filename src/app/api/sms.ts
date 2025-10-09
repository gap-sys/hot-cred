import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'src/lib';

function normalizePhone(phone: string): string {
    let raw = phone.replace(/\D/g, '');
    if (raw.length === 11) {
        raw = '55' + raw;
    }
    return raw;
}

const CHAT_HOT_TOKEN = process.env.CHAT_HOT_TOKEN!;
const CHAT_HOT_QUEUE_ID = process.env.CHAT_HOT_QUEUE_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { phone } = req.body;
        const rawPhone = normalizePhone(phone);

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000;

        const upsertToken = async () => {
            await supabase.from('sms_tokens').delete().eq('phone', rawPhone);
            await supabase.from('sms_tokens').upsert([
                { phone: rawPhone, code, expires_at: expiresAt }
            ]);
        };

        const sendWhatsApp = async () => {
            const whatsappResponse = await fetch('https://api2.chathot.com.br/api/messages/whatsmeow/sendTextPRO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CHAT_HOT_TOKEN}`,
                },
                body: JSON.stringify({
                    number: rawPhone,
                    openTicket: 1,
                    queueId: CHAT_HOT_QUEUE_ID,
                    body: `Seu código de verificação: ${code}`,
                }),
            });

            if (!whatsappResponse.ok) {
                const error = await whatsappResponse.text();
                throw new Error(error || 'Erro ao enviar WhatsApp');
            }
        };

        await Promise.all([upsertToken(), sendWhatsApp()]);

        return res.status(200).json({
            success: true,
            message: 'WhatsApp enviado com sucesso'
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Erro ao enviar WhatsApp'
        });
    }
}

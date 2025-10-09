import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'src/lib';

function normalizePhone(phone: string): string {
    let raw = phone.replace(/\D/g, '');
    if (raw.length === 11) {
        raw = '55' + raw;
    }
    return raw;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { phone, code } = req.body;
    const rawPhone = normalizePhone(phone);

    const { data: rows } = await supabase
        .from('sms_tokens')
        .select('*')
        .eq('phone', rawPhone)
        .eq('code', code)
        .limit(1);

    const row = rows && rows[0];

    if (!row) {
        return res.status(400).json({ success: false, error: 'Código inválido' });
    }

    if (row.expires_at < Date.now()) {
        await supabase.from('sms_tokens').delete().eq('phone', rawPhone);
        return res.status(400).json({ success: false, error: 'Código expirado' });
    }

    await supabase.from('sms_tokens').delete().eq('phone', rawPhone);

    return res.status(200).json({ success: true });
} 
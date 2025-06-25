import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { cep } = req.body;
    if (!cep) {
        return res.status(400).json({ error: 'CEP não informado' });
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
        const data = await response.json();
        if (data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao consultar CEP', details: String(error) });
    }
}

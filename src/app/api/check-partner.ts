import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cpf, cnpj } = req.body;

    if (!cpf && !cnpj) {
      return res.status(400).json({ error: 'CPF ou CNPJ deve ser fornecido' });
    }

    // Monta o payload para verificar no webhook do n8n
    const checkData: any = {};
    if (cpf) checkData.cpf = cpf;
    if (cnpj) checkData.cnpj = cnpj;
    checkData.action = 'check_exists'; // Flag para indicar que é uma verificação

    const response = await fetch('https://n8n.americaintegracao.com.br/webhook/callback_partners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkData),
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Erro ao verificar dados.' });
    }

    const data = await response.json();
    
    // Assume que o webhook retorna { exists: true/false, type: 'cpf'|'cnpj' }
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao verificar parceiro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
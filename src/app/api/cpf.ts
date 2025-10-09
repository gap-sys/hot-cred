import type { NextApiRequest, NextApiResponse } from 'next';

const API_BRASIL_TOKEN = process.env.API_BRASIL_TOKEN!;
const DEVICE_TOKEN_CPF = process.env.DEVICE_TOKEN_CPF!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { cpf } = req.body;

  try {
    console.log('Consultando CPF:', cpf);

    const response = await fetch('https://gateway.apibrasil.io/api/v2/dados/cpf', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_BRASIL_TOKEN}`,
        'Content-Type': 'application/json',
        'DeviceToken': DEVICE_TOKEN_CPF
      },
      body: JSON.stringify({ cpf }),
    });

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (data.response?.erro && data.response?.message === 'CPF não encontrado') {
      return res.status(404).json({
        error: true,
        message: 'CPF não encontrado na base da Receita Federal'
      });
    }

    if (!response.ok) {
      console.error('Erro na API:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro na consulta CPF:', error);
    return res.status(500).json({
      error: 'Erro ao consultar CPF',
      details: String(error),
    });
  }
}

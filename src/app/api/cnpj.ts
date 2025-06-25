import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { cnpj } = req.body;

  if (!cnpj) {
    return res.status(400).json({ error: 'CNPJ não fornecido' });
  }

  try {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpjLimpo}`);

    if (response.status === 404) {
      return res.status(404).json({
        error: true,
        message: 'CNPJ não encontrado na base da Receita Federal'
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: true,
        message: 'Erro ao consultar CNPJ'
      });
    }

    const data = await response.json();

    const formattedResponse = {
      response: {
        cnpj: {
          empresa: {
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia
          },
          tipo_logradouro: data.estabelecimento?.tipo_logradouro,
          logradouro: data.estabelecimento?.logradouro,
          numero: data.estabelecimento?.numero,
          bairro: data.estabelecimento?.bairro,
          cep: data.estabelecimento?.cep,
          municipio: {
            descricao: data.estabelecimento?.cidade?.nome
          },
          uf: data.estabelecimento?.estado?.sigla,
          complemento: data.estabelecimento?.complemento,
          telefone: data.estabelecimento?.telefone1,
          email: data.estabelecimento?.email,
          situacao_cadastral: data.estabelecimento?.situacao_cadastral,
          natureza_juridica: data.natureza_juridica?.descricao,
          porte: data.porte?.descricao
        }
      }
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Erro ao consultar CNPJ:', error);
    return res.status(500).json({
      error: true,
      message: 'Erro ao consultar CNPJ',
      details: String(error)
    });
  }
}

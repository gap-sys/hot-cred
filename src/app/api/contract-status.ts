import { NextApiRequest, NextApiResponse } from 'next';

interface ContractStatusRequest {
  cpf: string;
  cnpj?: string;
  email: string;
  contractSent: boolean;
  envelopeId?: string;
  errorMessage?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cpf, cnpj, email, contractSent, envelopeId, errorMessage }: ContractStatusRequest = req.body;

    // Validação dos dados obrigatórios
    if (!cpf || !email || typeof contractSent !== 'boolean') {
      return res.status(400).json({
        error: 'Dados obrigatórios não fornecidos',
        required: ['cpf', 'email', 'contractSent']
      });
    }

    // Preparar dados para enviar ao back-end
    const statusData = {
      cpf: cpf.replace(/\D/g, ''), // Remove formatação do CPF
      cnpj: cnpj ? cnpj.replace(/\D/g, '') : undefined, // Remove formatação do CNPJ se existir
      email,
      contractSent,
      envelopeId: contractSent ? envelopeId : undefined,
      errorMessage: !contractSent ? errorMessage : undefined,
      timestamp: new Date().toISOString()
    };

    console.log('Enviando status do contrato para o back-end:', statusData);

    // Aqui você deve configurar a URL do seu back-end
    // Por exemplo: process.env.BACKEND_URL ou uma URL específica
    const backendUrl = process.env.BACKEND_CONTRACT_STATUS_URL || 'https://your-backend.com/api/contract-status';

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione headers de autenticação se necessário
        // 'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
      },
      body: JSON.stringify(statusData)
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Erro ao enviar status para o back-end:', {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        error: errorData
      });
      
      return res.status(500).json({
        error: 'Erro ao comunicar com o back-end',
        details: {
          status: backendResponse.status,
          message: errorData.message || backendResponse.statusText
        }
      });
    }

    const backendResult = await backendResponse.json();
    console.log('Status enviado com sucesso para o back-end:', backendResult);

    return res.status(200).json({
      success: true,
      message: 'Status do contrato enviado com sucesso para o back-end',
      data: backendResult
    });

  } catch (error) {
    console.error('Erro inesperado ao processar status do contrato:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: String(error)
    });
  }
}
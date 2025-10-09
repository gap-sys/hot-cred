import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://n8n.americaintegracao.com.br/webhook/callback_site_america', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      })

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Erro ao processar a solicitação.' })
      }

      const data = await response.json()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

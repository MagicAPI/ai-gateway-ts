import { NextApiRequest, NextApiResponse } from 'next'
import { streamHandler } from '../../../handlers/stream'
import { providers } from '../../../config/providers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const provider = req.headers['x-provider'] as string
  if (!provider || !providers[provider as keyof typeof providers]) {
    return res.status(400).json({ error: 'Invalid or missing provider' })
  }

  let requestBody
  try {
    requestBody = req.body
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON format' })
  }

  const isStreaming = requestBody?.stream ?? false

  if (isStreaming) {
    return streamHandler(req, res)
  }

  return res.status(501).json({ message: 'Non-streaming requests not yet implemented' })
} 
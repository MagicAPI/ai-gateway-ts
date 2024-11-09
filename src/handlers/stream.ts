import { NextApiRequest, NextApiResponse } from 'next'
import { providers } from '../config/providers'
import { streamResponse } from '../utils/stream'
import { createRequestConfig } from '../utils/request'

export async function streamHandler(req: NextApiRequest, res: NextApiResponse) {
  const provider = req.headers['x-provider'] as keyof typeof providers
  const providerConfig = providers[provider]

  const config = await createRequestConfig({
    provider: providerConfig,
    path: req.url || '',
    headers: {
      'Content-Type': req.headers['content-type'] || '',
      'Authorization': Array.isArray(req.headers['authorization']) ? req.headers['authorization'][0] : req.headers['authorization'] || '',
      'x-provider': Array.isArray(req.headers['x-provider']) ? req.headers['x-provider'][0] : req.headers['x-provider'] || ''
    },
    body: req.body,
    isStreaming: true
  })

  return streamResponse(res, config)
} 
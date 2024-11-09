import type { NextApiResponse } from 'next'
import type { RequestConfig } from '../types/index.js'

export async function streamResponse(res: NextApiResponse, config: RequestConfig) {
  console.info('Starting streamResponse function')

  const adjustedPath = config.path.replace(/^\/api/, '')

  console.debug('Fetching data from provider', {
    url: `${config.provider.baseUrl}${adjustedPath}`,
    body: config.body
  })

  console.log('config.headers', config.headers)

  const response = await fetch(`${config.provider.baseUrl}${adjustedPath}`, {
    method: 'POST',
    headers: {
      ...config.headers,
      'Authorization': config.headers['Authorization'] || '',
      'x-provider': config.headers['x-provider'] || ''
    },
    body: JSON.stringify(config.body)
  })

  if (!response.ok) {
    console.error('Provider error', { status: response.status, statusText: response.statusText })
    res.status(response.status).json({ error: `Provider error: ${response.statusText}` })
    return
  }

  console.info('Response received successfully')

  const reader = response.body?.getReader()
  if (!reader) {
    console.error('No response stream available')
    res.status(500).json({ error: 'No response stream available' })
    return
  }

  console.debug('Starting to read response stream')

  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      console.info('Finished reading response stream')
      break
    }

    buffer += decoder.decode(value, { stream: true })

    let boundary = buffer.indexOf('\n')
    while (boundary !== -1) {
      const chunk = buffer.slice(0, boundary).trim()
      buffer = buffer.slice(boundary + 1)

      if (chunk) {
        res.write(`data: ${chunk}\n\n`)
      }

      boundary = buffer.indexOf('\n')
    }
  }

  // Send a final [DONE] message
  res.write('data: [DONE]\n\n')
  res.end()
} 
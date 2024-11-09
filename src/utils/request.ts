import type { RequestConfig } from '../types/index.js'

export async function createRequestConfig(config: RequestConfig): Promise<RequestConfig> {
  const { provider, headers, body, path } = config
  
  // Merge provider-specific headers with request headers
  const mergedHeaders = {
    ...provider.headers,
    ...headers,
    ...(provider.headers['x-provider'] ? { 'x-provider': provider.headers['x-provider'] } : {})
  }

  return {
    ...config,
    headers: mergedHeaders
  }
} 
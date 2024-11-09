import type { ProviderConfig } from '../types/index.js'

export const providers: ProviderConfig = {
  openai: {
    name: 'openai',
    baseUrl: 'https://api.openai.com',
    headers: {
      'Content-Type': 'application/json',
    }
  },
  groq: {
    name: 'groq',
    baseUrl: 'https://api.groq.com/openai',
    headers: {
      'Content-Type': 'application/json',
    }
  }
} 
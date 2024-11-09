export interface Provider {
  name: string;
  baseUrl: string;
  headers: Record<string, string>;
}

export interface RequestConfig {
  provider: Provider;
  path: string;
  headers: Record<string, string>;
  body: unknown;
  isStreaming: boolean;
}

export interface ProviderConfig {
  openai: Provider;
  groq: Provider;
  // Easy to extend for future providers
} 
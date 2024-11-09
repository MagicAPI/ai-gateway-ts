# Magicapi-ai-gateway-ts

The world's fastest AI Gateway proxy, written in TypeScript and optimized for maximum performance. This high-performance API gateway routes requests to various AI providers (OpenAI, GROQ) with streaming support, making it perfect for developers who need reliable and blazing-fast AI API access.

## Features

- 🚀 Blazing fast performance - built with Hono, the ultrafast web framework
- ⚡ Optimized for low latency and high throughput
- 🔄 Unified API interface for multiple AI providers (OpenAI, GROQ)
- 📡 Real-time streaming support with minimal overhead
- 🔍 Built-in health checking
- 🛡️ Configurable CORS
- 🔀 Smart provider-specific request routing
- 📊 Efficient request/response proxying
- 💪 Production-ready and battle-tested

## Quick Start

### Installation

Clone the repository and install dependencies:

````bash
git clone https://github.com/yourusername/magicapi-ai-gateway-ts.git
cd magicapi-ai-gateway-ts
npm install
````

### Running the Server

Start the server with:

````bash
npm run start
````

The server will start on `http://localhost:3000` by default.

### Configuration

You can configure the gateway using environment variables:

````bash
# Basic configuration
export NODE_ENV=production

# Start the gateway
npm run start

# Or with custom port
PORT=8080 npm run start
````

## Usage

### Making Requests

To make requests through the gateway, use the `/api/v1/*` endpoint and specify the provider using the `x-provider` header.

#### Example: OpenAI Request

````bash
curl --location '127.0.0.1:3000/api/v1/chat/completions' \
  --header 'Authorization: Bearer sk-proj-OPEN_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'x-provider: openai' \
  --data '{
    "model": "gpt-4o-mini",
    "messages": [
        {
            "role": "user",
            "content": "Write a short poem"
        }
    ],
    "stream": true,
    "max_tokens": 300
  }'
````

#### Example: GROQ Request

````bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-provider: groq" \
  -H "Authorization: Bearer your-groq-api-key" \
  -d '{
    "model": "llama2-70b-4096",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true,
    "max_tokens": 300
  }'
````

## Performance

Magicapi-ai-gateway-ts is designed for maximum performance:

- **Ultrafast routing** with Hono
- **Asynchronous I/O** for optimal resource utilization
- **Connection pooling** for efficient HTTP connections
- **Memory-efficient** request/response proxying
- **Minimal overhead** in the request path
- **Optimized streaming** response handling

## Architecture

The gateway leverages the best-in-class JavaScript ecosystem:

- **Hono** - High-performance web framework
- **Node.js** - Industry-standard runtime
- **TypeScript** - Strongly typed language for better maintainability

## Security Notes

- Always run behind a reverse proxy in production
- Configure CORS appropriately for your use case
- Use environment variables for sensitive configuration
- Consider adding rate limiting for production use

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

````bash
# Install development dependencies
npm install

# Run tests
npm test

# Run with hot reload
npm run dev
````

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if port 3000 is available
   - Verify the HOST and PORT settings

2. **Streaming Not Working**
   - Ensure `Accept: text/event-stream` header is set
   - Check client supports streaming
   - Verify provider supports streaming for the requested endpoint

3. **Provider Errors**
   - Verify provider API keys are correct
   - Check provider-specific headers are properly set
   - Ensure the provider endpoint exists and is correctly formatted

## Support

For support, please open an issue in the GitHub repository. Our community is active and happy to help!

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to all our contributors and the JavaScript community for making this project possible.
export default function IndexPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#f0f0f0', borderRadius: '0.25rem', marginBottom: '1rem' }}>
          High Performance AI Gateway
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          MagicAPI AI Gateway
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '750px', margin: '0 auto' }}>
          The world's fastest AI Gateway proxy, optimized for maximum performance with support for multiple AI providers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { title: "Blazing Fast", description: "Built with Hono, optimized for low latency and high throughput" },
          { title: "Multiple Providers", description: "Unified API interface for OpenAI, GROQ and more" },
          { title: "Real-time Streaming", description: "Efficient streaming support with minimal overhead" },
          { title: "Production Ready", description: "Battle-tested with built-in security features" },
          { title: "Configurable CORS", description: "Flexible cross-origin resource sharing settings" },
          { title: "Smart Routing", description: "Intelligent provider-specific request routing" }
        ].map((feature, index) => (
          <div key={index} style={{ border: '1px solid #ddd', borderRadius: '0.25rem', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h2>
            <p style={{ color: '#666' }}>{feature.description}</p>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '0.25rem', padding: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Quick Start</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Get up and running in minutes</p>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '0.25rem' }}>
          git clone https://github.com/MagicAPI/ai-gateway-ts.git<br />
          cd magicapi-ai-gateway-ts<br />
          npm install<br />
          npm run start
        </pre>
      </div>

      <div style={{ textAlign: 'center' }}>
        <a href="https://github.com/MagicAPI/ai-gateway-ts" style={{ color: '#0070f3', textDecoration: 'none' }}>
          View on GitHub
        </a>
      </div>
    </div>
  )
}

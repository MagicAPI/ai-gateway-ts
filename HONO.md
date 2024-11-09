
Hello World
You can write code in TypeScript with the Cloudflare Workers development tool "Wrangler", Deno, Bun, or others without being aware of transpiling.

Write your first application with Hono in src/index.ts. The example below is a starter Hono application.

The import and the final export default parts may vary from runtime to runtime, but all of the application code will run the same code everywhere.

ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
Start the development server and access http://localhost:8787 with your browser.


npm

yarn

pnpm

bun
sh
npm run dev
Return JSON
Returning JSON is also easy. The following is an example of handling a GET Request to /api/hello and returning an application/json Response.

ts
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})
Request and Response
Getting a path parameter, URL query value, and appending a Response header is written as follows.

ts
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})
We can easily handle POST, PUT, and DELETE not only GET.

ts
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)
Return HTML
You can write HTML with the html Helper or using JSX syntax. If you want to use JSX, rename the file to src/index.tsx and configure it (check with each runtime as it is different). Below is an example using JSX.

tsx
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})
Return raw Response
You can also return the raw Response.

ts
app.get('/', (c) => {
  return new Response('Good morning!')
})
Using Middleware
Middleware can do the hard work for you. For example, add in Basic Authentication.

ts
import { basicAuth } from 'hono/basic-auth'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})
There are useful built-in middleware including Bearer and authentication using JWT, CORS and ETag. Hono also provides third-party middleware using external libraries such as GraphQL Server and Firebase Auth. And, you can make your own middleware.

Adapter
There are Adapters for platform-dependent functions, e.g., handling static files or WebSocket. For example, to handle WebSocket in Cloudflare Workers, import hono/cloudflare-workers.

ts
import { upgradeWebSocket } from 'hono/cloudflare-workers'

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    // ...
  })
)


Hono
Hono - means flame🔥 in Japanese - is a small, simple, and ultrafast web framework built on Web Standards. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js.

Fast, but not only fast.

ts
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app
Quick Start
Just run this:


npm

yarn

pnpm

bun

deno
sh
npm create hono@latest
Features
Ultrafast 🚀 - The router RegExpRouter is really fast. Not using linear loops. Fast.
Lightweight 🪶 - The hono/tiny preset is under 14kB. Hono has zero dependencies and uses only the Web Standards.
Multi-runtime 🌍 - Works on Cloudflare Workers, Fastly Compute, Deno, Bun, AWS Lambda, or Node.js. The same code runs on all platforms.
Batteries Included 🔋 - Hono has built-in middleware, custom middleware, third-party middleware, and helpers. Batteries included.
Delightful DX 😃 - Super clean APIs. First-class TypeScript support. Now, we've got "Types".
Use-cases
Hono is a simple web application framework similar to Express, without a frontend. But it runs on CDN Edges and allows you to construct larger applications when combined with middleware. Here are some examples of use-cases.

Building Web APIs
Proxy of backend servers
Front of CDN
Edge application
Base server for a library
Full-stack application
Who is using Hono?
Project	Platform	What for?
cdnjs	Cloudflare Workers	A free and open-source CDN service. Hono is used for the api server.
Cloudflare D1	Cloudflare Workers	Serverless SQL databases. Hono is used for the internal api server.
BaseAI	Local AI Server	Serverless AI agent pipes with memory. An open-source agentic AI framework for web. API server with Hono.
Unkey	Cloudflare Workers	An open-source API authentication and authorization. Hono is used for the api server.
OpenStatus	Bun	An open-source website & API monitoring platform. Hono is used for the api server.
Deno Benchmarks	Deno	A secure TypeScript runtime built on V8. Hono is used for benchmarking.
And the following.

Drivly - Cloudflare Workers
repeat.dev - Cloudflare Workers
Do you want to see more? See Who is using Hono in production?.

Hono in 1 minute
A demonstration to create an application for Cloudflare Workers with Hono.

Demo

Ultrafast
Hono is the fastest, compared to other routers for Cloudflare Workers.


Hono x 402,820 ops/sec ±4.78% (80 runs sampled)
itty-router x 212,598 ops/sec ±3.11% (87 runs sampled)
sunder x 297,036 ops/sec ±4.76% (77 runs sampled)
worktop x 197,345 ops/sec ±2.40% (88 runs sampled)
Fastest is Hono
✨  Done in 28.06s.
See more benchmarks.

Lightweight
Hono is so small. With the hono/tiny preset, its size is under 14KB when minified. There are many middleware and adapters, but they are bundled only when used. For context, the size of Express is 572KB.


$ npx wrangler dev --minify ./src/index.ts
 ⛅️ wrangler 2.20.0
--------------------
⬣ Listening at http://0.0.0.0:8787
- http://127.0.0.1:8787
- http://192.168.128.165:8787
Total Upload: 11.47 KiB / gzip: 4.34 KiB



Streaming Helper
The Streaming Helper provides methods for streaming responses.

Import
ts
import { Hono } from 'hono'
import { stream, streamText, streamSSE } from 'hono/streaming'
stream()
It returns a simple streaming response as Response object.

ts
app.get('/stream', (c) => {
  return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
    })
    // Write a Uint8Array.
    await stream.write(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]))
    // Pipe a readable stream.
    await stream.pipe(anotherReadableStream)
  })
})
streamText()
It returns a streaming response with Content-Type:text/plain, Transfer-Encoding:chunked, and X-Content-Type-Options:nosniff headers.

ts
app.get('/streamText', (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    await stream.writeln('Hello')
    // Wait 1 second.
    await stream.sleep(1000)
    // Write a text without a new line.
    await stream.write(`Hono!`)
  })
})
WARNING

If you are developing an application for Cloudflare Workers, a streaming may not work well on Wrangler. If so, add Identity for Content-Encoding header.

ts
app.get('/streamText', (c) => {
  c.header('Content-Encoding', 'Identity')
  return streamText(c, async (stream) => {
    // ...
  })
})
streamSSE()
It allows you to stream Server-Sent Events (SSE) seamlessly.

ts
const app = new Hono()
let id = 0

app.get('/sse', async (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      const message = `It is ${new Date().toISOString()}`
      await stream.writeSSE({
        data: message,
        event: 'time-update',
        id: String(id++),
      })
      await stream.sleep(1000)
    }
  })
})
Error Handling
The third argument of the streaming helper is an error handler. This argument is optional, if you don't specify it, the error will be output as a console error.

ts
app.get('/stream', (c) => {
  return stream(
    c,
    async (stream) => {
      // Write a process to be executed when aborted.
      stream.onAbort(() => {
        console.log('Aborted!')
      })
      // Write a Uint8Array.
      await stream.write(
        new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
      )
      // Pipe a readable stream.
      await stream.pipe(anotherReadableStream)
    },
    (err, stream) => {
      stream.writeln('An error occurred!')
      console.error(err)
    }
  )
})
The stream will be automatically closed after the callbacks are executed.

Factory Helper
The Factory Helper provides useful functions for creating Hono's components such as Middleware. Sometimes it's difficult to set the proper TypeScript types, but this helper facilitates that.

Import
ts
import { Hono } from 'hono'
import { createFactory, createMiddleware } from 'hono/factory'
createFactory()
createFactory() will create an instance of the Factory class.

ts
import { createFactory } from 'hono/factory'

const factory = createFactory()
You can pass your Env types as Generics:

ts
type Env = {
  Variables: {
    foo: string
  }
}

const factory = createFactory<Env>()
createMiddleware()
createMiddleware() is shortcut of factory.createMiddleware(). This function will create your custom middleware.

ts
const messageMiddleware = createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('X-Message', 'Good morning!')
})
Tip: If you want to get an argument like message, you can create it as a function like the following.

ts
const messageMiddleware = (message: string) => {
  return createMiddleware(async (c, next) => {
    await next()
    c.res.headers.set('X-Message', message)
  })
}

app.use(messageMiddleware('Good evening!'))
factory.createHandlers()
createHandlers() helps to define handlers in a different place than app.get('/').

ts
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

// ...

const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)
factory.createApp() Experimental
createApp() helps to create an instance of Hono with the proper types. If you use this method with createFactory(), you can avoid redundancy in the definition of the Env type.

If your application is like this, you have to set the Env in two places:

ts
import { createMiddleware } from 'hono/factory'

type Env = {
  Variables: {
    myVar: string
  }
}

// 1. Set the `Env` to `new Hono()`
const app = new Hono<Env>()

// 2. Set the `Env` to `createMiddleware()`
const mw = createMiddleware<Env>(async (c, next) => {
  await next()
})

app.use(mw)
By using createFactory() and createApp(), you can set the Env only in one place.

ts
import { createFactory } from 'hono/factory'

// ...

// Set the `Env` to `createFactory()`
const factory = createFactory<Env>()

const app = factory.createApp()

// factory also has `createMiddleware()`
const mw = factory.createMiddleware(async (c, next) => {
  await next()
})
createFactory() can receive the initApp option to initialize an app created by createApp(). The following is an example that uses the option.

ts
// factory-with-db.ts
type Env = {
  Bindings: {
    MY_DB: D1Database
  }
  Variables: {
    db: DrizzleD1Database
  }
}

export default createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = drizzle(c.env.MY_DB)
      c.set('db', db)
      await next()
    })
  },
})
ts
// crud.ts
import factoryWithDB from './factory-with-db'

const app = factoryWithDB.createApp()

app.post('/posts', (c) => {
  c.var.db.insert()
  // ...
})
Edit this page on GitHub

WebSocket Helper
WebSocket Helper is a helper for server-side WebSockets in Hono applications. Currently Cloudflare Workers / Pages, Deno, and Bun adapters are available.

Import

Cloudflare Workers

Deno

Bun
ts
import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'
If you use Node.js, you can use @hono/node-ws.

upgradeWebSocket()
upgradeWebSocket() returns a handler for handling WebSocket.

ts
const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`)
        ws.send('Hello from server!')
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
  })
)
Available events:

onOpen - Currently, Cloudflare Workers does not support it.
onMessage
onClose
onError
WARNING

If you use middleware that modifies headers (e.g., applying CORS) on a route that uses WebSocket Helper, you may encounter an error saying you can't modify immutable headers. This is because upgradeWebSocket() also changes headers internally.

Therefore, please be cautious if you are using WebSocket Helper and middleware at the same time.

RPC-mode
Handlers defined with WebSocket Helper support RPC mode.

ts
// server.ts
const wsApp = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    //...
  })
)

export type WebSocketApp = typeof wsApp

// client.ts
const client = hc<WebSocketApp>('http://localhost:8787')
const socket = client.ws.$ws() // A WebSocket object for a client
Examples
See the examples using WebSocket Helper.

Server and Client
ts
// server.ts
import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono().get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      onMessage: (event) => {
        console.log(event.data)
      },
    }
  })
)

export default app
ts
// client.ts
import { hc } from 'hono/client'
import type app from './server'

const client = hc<typeof app>('http://localhost:8787')
const ws = client.ws.$ws(0)

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(new Date().toString())
  }, 1000)
})
Bun with JSX
tsx
import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'

const { upgradeWebSocket, websocket } = createBunWebSocket()

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset='UTF-8' />
      </head>
      <body>
        <div id='now-time'></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        const ws = new WebSocket('ws://localhost:3000/ws')
        const $nowTime = document.getElementById('now-time')
        ws.onmessage = (event) => {
          $nowTime.textContent = event.data
        }
        `,
          }}
        ></script>
      </body>
    </html>
  )
})

const ws = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    let intervalId
    return {
      onOpen(_event, ws) {
        intervalId = setInterval(() => {
          ws.send(new Date().toString())
        }, 200)
      },
      onClose() {
        clearInterval(intervalId)
      },
    }
  })
)

export default {
  fetch: app.fetch,
  websocket,
}
import { Hono } from 'hono'
import { contextStorage, getContext } from 'hono/context-storage'
import type { MiddlewareHandler } from 'hono'

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next()
  } catch (error) {
    console.error('Error:', error)
    const context = getContext()
    return context.json({
      error: {
        message: error instanceof Error ? error.message : 'Internal Server Error',
        status: context.res.status || 500
      }
    }, 500)
  }
}

// Example of setting up the Hono app with contextStorage middleware
const app = new Hono()

app.use(contextStorage())

// Apply the errorHandler middleware
app.use(errorHandler)

// ... other routes and middleware
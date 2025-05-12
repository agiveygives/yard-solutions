// utils/withLogging.ts
import type { EventHandler, H3Event } from 'h3'

export function withLogging<T>(
  handler: (event: H3Event) => Promise<T>
): EventHandler {
  return async (event) => {
    const path = event.path || 'unknown-path'
    console.log(`🟢 [START] Handling request for ${path}`)

    try {
      const response = await handler(event)
      console.log(`✅ [END] Response for ${path}:`, JSON.stringify(response, null, 2))
      return response
    } catch (error) {
      console.error(`❌ [ERROR] Request for ${path} failed:`, error)
      throw error
    }
  }
}

import { serverSupabaseClient } from '~/server/utils/supabase';
import { withLogging } from '~/server/utils/withLogging';

export default eventHandler(withLogging(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      setResponseStatus(event, 400)
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Quote ID is required"
      }
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      setResponseStatus(event, 400)
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid quote ID format"
      }
    }

    const client = serverSupabaseClient()
    const { data, error, status, statusText } = await client
      .from('quotes')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase fetch error:', error)
      setResponseStatus(event, status)
      return {
        statusCode: status,
        statusMessage: statusText,
        message: error.message
      }
    }

    if (!data) {
      setResponseStatus(event, 404)
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Quote not found"
      }
    }

    return { data }
  } catch (e) {
    console.error('Exception during fetch:', e)
    setResponseStatus(event, 500)
    return {
      statusCode: 500,
      statusMessage: "Server error",
      message: e instanceof Error ? e.message : 'Unknown error during fetch'
    }
  }
}));

import { serverSupabaseClient } from '../../../utils/supabase';
import { withLogging } from '../../../utils/withLogging';

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

    const body = await readBody(event)
    const validationData = JSON.parse(Array.isArray(body) ? body[0] : body)

    const client = serverSupabaseClient()
    const { data, error } = await client
      .from('quotes')
      .select()
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error('Supabase fetch error:', error)
      return { data: false }
    }

    const validated = data.email.toLowerCase() === validationData.email.toLowerCase();

    return { data: validated }
  } catch (e) {
    console.error('Exception during upload:', e)
    setResponseStatus(event, 500)
    return {
      statusCode: 500,
      statusMessage: "Server error",
      message: e instanceof Error ? e.message : 'Unknown error during upload'
    }
  }
}));

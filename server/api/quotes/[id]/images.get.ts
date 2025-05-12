import { serverSupabaseClient, buildStorageUrl } from '../../../utils/supabase';
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

    const client = serverSupabaseClient()

    const { data, error } = await client.storage
      .from('quote-images')
      .list(id, {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error listing files:', error.message);
    }

    const dataUrls = data?.map((image) => buildStorageUrl('quote-images', id, image.name))

    return { data: dataUrls }
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

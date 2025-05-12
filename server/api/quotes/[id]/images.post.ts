import { serverSupabaseClient } from '../../../utils/supabase'
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

    const formData = await readFormData(event)
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      setResponseStatus(event, 400)
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "No files provided"
      }
    }

    const client = serverSupabaseClient()
    const uploadedFiles = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue
      }

      // Generate a unique filename
      const timestamp = Date.now()
      const extension = file.type.split('/').pop()
      const filename = `${timestamp}.${extension}`

      // Upload to Supabase Storage
      const { data, error } = await client
        .storage
        .from('quote-images')
        .upload(`${id}/${filename}`, file, {
          contentType: file.type,
          cacheControl: '3600'
        })

      if (error) {
        console.error('Error uploading file:', error)
        continue
      }

      if (data) {
        // Get the public URL
        const { data: { publicUrl } } = client
          .storage
          .from('quote-images')
          .getPublicUrl(`${id}/${filename}`)

        uploadedFiles.push({
          path: data.path,
          url: publicUrl
        })
      }
    }

    if (uploadedFiles.length === 0) {
      setResponseStatus(event, 400)
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "No valid images were uploaded"
      }
    }

    return {
      data: uploadedFiles
    }
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

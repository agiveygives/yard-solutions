import { serverSupabaseClient } from '~/server/utils/supabase'
import { sendQuoteEmail } from '~/server/utils/brevo/sendQuoteEmail';
import { withLogging } from '~/server/utils/withLogging';
import { formatJobType } from '~/utils/formatJobType';

export default eventHandler(withLogging(async (event) => {
  try {
    const body = await readBody(event)

    const quoteData = JSON.parse(Array.isArray(body) ? body[0] : body)

    const client = serverSupabaseClient()

    const { data, error, status, statusText } = await client
      .from('quotes')
      .insert([
        {
          address_line1: quoteData.address_line1,
          address_line2: quoteData.address_line2,
          city: quoteData.city,
          state: quoteData.state,
          email: quoteData.email,
          family_name: quoteData.family_name,
          given_name: quoteData.given_name,
          job_type: quoteData.job_type,
          phone_number: quoteData.phone_number,
          postal_code: quoteData.postal_code,
          preferred_job_date: quoteData.preferred_job_date,
          description: quoteData.description
        },
      ])
      .select()

    setResponseStatus(event, status)

    if (error) {
      console.error('Supabase insert error:', error)
      return {
        statusCode: status,
        statusMessage: statusText,
        message: error.message,
      }
    }

    await sendQuoteEmail(
      quoteData.email,
      `${quoteData.given_name} ${quoteData.family_name}`,
      formatJobType(quoteData.job_type).toLowerCase(),
      `${process.env.HOST || "https://yardsolutionskc.com"}/quotes/${data[0].id}`,
      quoteData.phone_number,
    )

    return { data: data[0] }
  } catch (e) {
    console.error('Exception during insert:', e)
    setResponseStatus(event, 500)
    return {
      statusCode: 500,
      statusMessage: "Server error",
      message: e instanceof Error ? e.message : 'Unknown error during insert'
    }
  }
}));

import { SendSmtpEmail, TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";

export const sendQuoteEmail = async (
  toEmail: string,
  toName: string,
  jobType: string,
  url: string,
  preferredContact: string
) => {
  const client = new TransactionalEmailsApi();
  client.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || "");

  const email = new SendSmtpEmail();

  email.templateId = 1;
  email.sender = { id: 2 };
  email.to = [{ email: toEmail, name: toName }, { email: "yardsolutionsllclawncare@gmail.com", name: "Yard Solutions LLC"}];
  email.params = {
    jobType,
    url,
    preferredContact,
    email: toEmail,
  };

  try {
    await client.sendTransacEmail(email)
  } catch (e) {
    console.error('Exception sending quote email:', e)
  }
}

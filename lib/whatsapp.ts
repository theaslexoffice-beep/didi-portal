/**
 * WhatsApp Cloud API Integration Stub
 *
 * TODO: Implement when Meta Business verification is complete
 *
 * Setup steps:
 * 1. Create Meta Business Account
 * 2. Set up WhatsApp Business API in Meta Developer Console
 * 3. Get Phone Number ID and Access Token
 * 4. Configure webhook for incoming messages
 * 5. Set environment variables in .env.local
 */

const WHATSAPP_API_URL = "https://graph.facebook.com/v18.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

/**
 * Send a text message via WhatsApp Cloud API
 */
export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<boolean> {
  // TODO: Implement actual API call
  // const res = await fetch(
  //   `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       messaging_product: "whatsapp",
  //       to: `91${to}`, // India country code
  //       type: "text",
  //       text: { body: message },
  //     }),
  //   }
  // );
  // return res.ok;

  console.log(`[WhatsApp Stub] To: ${to}, Message: ${message}`);
  return true;
}

/**
 * Send OTP for user verification
 */
export async function sendWhatsAppOTP(
  to: string,
  otp: string
): Promise<boolean> {
  // TODO: Use WhatsApp template message for OTP
  return sendWhatsAppMessage(
    to,
    `Your DIDI verification code is: ${otp}. Do not share this with anyone.`
  );
}

/**
 * Webhook handler for incoming WhatsApp messages
 * Mount this at /api/whatsapp/webhook
 */
export function parseWhatsAppWebhook(body: any) {
  // TODO: Parse incoming message format from Meta webhook
  // const entry = body.entry?.[0];
  // const changes = entry?.changes?.[0];
  // const message = changes?.value?.messages?.[0];
  // return {
  //   from: message?.from,
  //   text: message?.text?.body,
  //   timestamp: message?.timestamp,
  // };
  return null;
}

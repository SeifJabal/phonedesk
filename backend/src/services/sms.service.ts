import twilio from 'twilio';

const getSmsClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) return null;
  return twilio(accountSid, authToken);
};

export async function sendClientSms(phone: string, message: string): Promise<void> {
  const client = getSmsClient();
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!client || !from) {
    console.log('[SMS] Skipped — Twilio not configured');
    return;
  }

  // Normalize French phone number to E.164
  let to = phone.replace(/\s/g, '');
  if (to.startsWith('0')) to = '+33' + to.slice(1);
  if (!to.startsWith('+')) to = '+33' + to;

  await client.messages.create({ body: message, from, to });
}

export function buildClientSmsMessage(devis: {
  customer: { firstName: string };
  brand: string;
  model: string;
  date: string;
  time: string;
  id: string;
}): string {
  return (
    `Bonjour ${devis.customer.firstName},\n` +
    `Votre demande de réparation (${devis.brand} ${devis.model}) a bien été reçue.\n` +
    `RDV : ${devis.date} à ${devis.time}.\n` +
    `Réf : #${devis.id.slice(-8).toUpperCase()}\n` +
    `PhoneRepair Louviers – 02 XX XX XX XX`
  );
}

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface DevisData {
  id: string;
  customer: { firstName: string; lastName: string; email: string; phone: string };
  device: string;
  brand: string;
  model: string;
  issues: string[];
  issueDescription?: string;
  imei?: string;
  hasPart: boolean;
  date: string;
  time: string;
}

const DEVICE_LABELS: Record<string, string> = {
  smartphone: 'Smartphone',
  tablet: 'Tablette',
  computer: 'Ordinateur',
  console: 'Console',
  watch: 'Montre',
};

export async function sendClientConfirmationEmail(devis: DevisData): Promise<void> {
  const deviceLabel = DEVICE_LABELS[devis.device] || devis.device;

  await transporter.sendMail({
    from: `"PhoneRepair Louviers" <${process.env.SMTP_USER}>`,
    to: devis.customer.email,
    subject: `✅ Confirmation de votre demande de devis - ${devis.brand} ${devis.model}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">📱 PhoneRepair Louviers</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Votre demande a bien été reçue !</p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <p style="color: #374151; font-size: 16px;">Bonjour <strong>${devis.customer.firstName}</strong>,</p>
      <p style="color: #6b7280;">Nous avons bien reçu votre demande de devis. Voici le récapitulatif :</p>

      <!-- Summary card -->
      <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Référence</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">#${devis.id.slice(-8).toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Appareil</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${deviceLabel} – ${devis.brand} ${devis.model}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Problème(s)</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${devis.issues.join(', ')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Rendez-vous</td>
            <td style="padding: 8px 0; color: #4f46e5; font-weight: 700; font-size: 14px;">📅 ${devis.date} à ${devis.time}</td>
          </tr>
          ${devis.hasPart ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Pièce</td><td style="padding: 8px 0; color: #059669; font-size: 14px;">✅ Pièce fournie par le client</td></tr>` : ''}
        </table>
      </div>

      ${devis.issueDescription ? `<div style="border-left: 3px solid #4f46e5; padding-left: 16px; margin: 16px 0;"><p style="color: #374151; font-style: italic; margin: 0;">"${devis.issueDescription}"</p></div>` : ''}

      <!-- Info box -->
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="color: #1d4ed8; margin: 0; font-size: 14px;">
          📍 <strong>Notre adresse :</strong> PhoneRepair Louviers, Louviers (27400)<br>
          📞 <strong>Téléphone :</strong> 02 XX XX XX XX<br>
          🕐 <strong>Horaires :</strong> Lundi–Samedi, 10h00–19h00
        </p>
      </div>

      <p style="color: #6b7280; font-size: 14px;">
        Notre équipe vous contactera pour confirmer votre rendez-vous. En cas de question, n'hésitez pas à nous appeler.
      </p>

      <p style="color: #374151;">À bientôt,<br><strong>L'équipe PhoneRepair Louviers</strong></p>
    </div>

    <!-- Footer -->
    <div style="background: #f3f4f6; padding: 16px 32px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Cet email a été envoyé automatiquement suite à votre demande sur notre site.
      </p>
    </div>
  </div>
</body>
</html>
    `,
  });
}

export async function sendAdminNotificationEmail(devis: DevisData, customAdminEmail?: string): Promise<void> {
  const deviceLabel = DEVICE_LABELS[devis.device] || devis.device;
  const adminEmail = customAdminEmail || process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await transporter.sendMail({
    from: `"PhoneRepair Louviers" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `🔔 Nouvelle demande de devis #${devis.id.slice(-8).toUpperCase()} – ${devis.customer.firstName} ${devis.customer.lastName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: #1e1b4b; padding: 24px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px;">🔔 Nouvelle demande de devis</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Référence : #${devis.id.slice(-8).toUpperCase()}</p>
    </div>
    <div style="padding: 32px;">
      <h3 style="color: #111827; margin: 0 0 16px;">👤 Client</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Nom</td><td style="color: #111827; font-weight: 600;">${devis.customer.firstName} ${devis.customer.lastName}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="color: #111827;"><a href="mailto:${devis.customer.email}">${devis.customer.email}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Téléphone</td><td style="color: #111827;"><a href="tel:${devis.customer.phone}">${devis.customer.phone}</a></td></tr>
      </table>

      <h3 style="color: #111827; margin: 0 0 16px;">📱 Appareil</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Type</td><td style="color: #111827; font-weight: 600;">${deviceLabel}</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Marque / Modèle</td><td style="color: #111827; font-weight: 600;">${devis.brand} ${devis.model}</td></tr>
        ${devis.imei ? `<tr><td style="padding: 6px 0; color: #6b7280;">IMEI</td><td style="color: #111827;">${devis.imei}</td></tr>` : ''}
        <tr><td style="padding: 6px 0; color: #6b7280;">Pièce fournie</td><td style="color: ${devis.hasPart ? '#059669' : '#6b7280'};">${devis.hasPart ? '✅ Oui' : '❌ Non'}</td></tr>
      </table>

      <h3 style="color: #111827; margin: 0 0 16px;">🔧 Problème(s)</h3>
      <p style="color: #374151; margin: 0 0 8px;">${devis.issues.join(' · ')}</p>
      ${devis.issueDescription ? `<p style="color: #6b7280; font-style: italic; background: #f3f4f6; padding: 12px; border-radius: 6px;">"${devis.issueDescription}"</p>` : ''}

      <h3 style="color: #111827; margin: 16px 0;">📅 Rendez-vous</h3>
      <p style="font-size: 20px; color: #4f46e5; font-weight: 700; margin: 0;">${devis.date} à ${devis.time}</p>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; text-align: center;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin" style="background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Voir dans l'espace admin →
        </a>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  });
}

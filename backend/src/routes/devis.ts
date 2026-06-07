import { Router, Request, Response } from 'express';
import DevisModel from '../models/Devis';
import AdminSettingsModel from '../models/AdminSettings';
import { sendClientConfirmationEmail, sendAdminNotificationEmail } from '../services/email.service';
import { sendClientSms, buildClientSmsMessage } from '../services/sms.service';

const router = Router();

// POST /api/v1/devis — create a new devis and send notifications
router.post('/', async (req: Request, res: Response) => {
  try {
    const { device, brand, model, issues, issueDescription, imei, hasPart, date, time, customer, adminEmail } = req.body;

    // Basic validation
    if (!device || !brand || !model || !issues?.length || !date || !time ||
        !customer?.firstName || !customer?.lastName || !customer?.email || !customer?.phone) {
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });
    }

    // Save to MongoDB
    const devis = await DevisModel.create({
      device, brand, model, issues, issueDescription, imei, hasPart, date, time, customer,
    });

    const devisData = {
      id: (devis._id as any).toString(),
      customer,
      device,
      brand,
      model,
      issues,
      issueDescription,
      imei,
      hasPart,
      date,
      time,
    };

    // Get admin email from database or use the one from request or fallback to env
    let notificationEmail = adminEmail;
    if (!notificationEmail) {
      const settings = await AdminSettingsModel.findOne();
      notificationEmail = settings?.notificationEmail || process.env.ADMIN_EMAIL;
    }

    // Send notifications in parallel (non-blocking — don't fail the response if they error)
    const notifications = [
      sendClientConfirmationEmail(devisData).catch(err =>
        console.error('[Email] Client confirmation failed:', err.message)
      ),
      sendAdminNotificationEmail(devisData, notificationEmail).catch(err =>
        console.error('[Email] Admin notification failed:', err.message)
      ),
      sendClientSms(customer.phone, buildClientSmsMessage(devisData)).catch(err =>
        console.error('[SMS] Client SMS failed:', err.message)
      ),
    ];

    // Fire and don't wait
    Promise.all(notifications);

    return res.status(201).json({
      success: true,
      message: 'Devis créé avec succès. Confirmations envoyées.',
      devisId: devisData.id,
      reference: devisData.id.slice(-8).toUpperCase(),
    });
  } catch (error: any) {
    console.error('[Devis] Error creating devis:', error.message);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// GET /api/v1/devis — list all (admin only, simple token check)
router.get('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers['x-admin-token'];
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }
    const devisList = await DevisModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: devisList });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// PATCH /api/v1/devis/:id — update status (admin)
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers['x-admin-token'];
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }
    const devis = await DevisModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!devis) return res.status(404).json({ success: false, message: 'Devis introuvable' });
    return res.json({ success: true, data: devis });
  } catch {
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

export default router;

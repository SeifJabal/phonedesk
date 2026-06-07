import { Router, Request, Response } from 'express';
import AdminSettingsModel from '../models/AdminSettings';

const router = Router();

console.log('[Admin Routes] Module loaded successfully');

// GET /api/v1/admin/settings — get admin settings
router.get('/settings', async (req: Request, res: Response) => {
  try {
    const token = req.headers['x-admin-token'];
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    const settings = await AdminSettingsModel.findOne();
    return res.json({ 
      success: true, 
      data: settings || { notificationEmail: process.env.ADMIN_EMAIL || '' }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// PUT /api/v1/admin/settings — update admin settings
router.put('/settings', async (req: Request, res: Response) => {
  try {
    console.log('[Admin] PUT /settings request received');
    console.log('[Admin] Headers:', req.headers['x-admin-token']);
    console.log('[Admin] Body:', req.body);
    
    const token = req.headers['x-admin-token'];
    if (token !== process.env.ADMIN_TOKEN) {
      console.log('[Admin] Token mismatch. Expected:', process.env.ADMIN_TOKEN, 'Got:', token);
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    const { notificationEmail } = req.body;
    if (!notificationEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notificationEmail)) {
      console.log('[Admin] Invalid email:', notificationEmail);
      return res.status(400).json({ success: false, message: 'Email invalide' });
    }

    console.log('[Admin] Saving email to database:', notificationEmail);
    const settings = await AdminSettingsModel.findOneAndUpdate(
      {},
      { notificationEmail },
      { new: true, upsert: true }
    );

    console.log('[Admin] Settings saved:', settings);
    return res.json({ success: true, data: settings });
  } catch (error: any) {
    console.error('[Admin] Error saving settings:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

export default router;

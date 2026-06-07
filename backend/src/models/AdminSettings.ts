import { Schema, model, Document } from 'mongoose';

export interface IAdminSettings extends Document {
  notificationEmail: string;
  updatedAt: Date;
}

const adminSettingsSchema = new Schema<IAdminSettings>(
  {
    notificationEmail: { 
      type: String, 
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { 
    timestamps: true,
    collection: 'admin_settings'
  }
);

export default model<IAdminSettings>('AdminSettings', adminSettingsSchema);

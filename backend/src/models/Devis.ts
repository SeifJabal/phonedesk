import mongoose, { Schema } from 'mongoose';

export interface IDevis {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  device: string;
  brand: string;
  model: string;
  issues: string[];
  issueDescription?: string;
  imei?: string;
  hasPart: boolean;
  date: string;
  time: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const DevisSchema = new Schema<IDevis>({
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  device: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  issues: [{ type: String }],
  issueDescription: { type: String },
  imei: { type: String },
  hasPart: { type: Boolean, default: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
});

export default mongoose.model<IDevis>('Devis', DevisSchema);

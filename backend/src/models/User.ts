import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'customer' | 'business' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  shopId?: mongoose.Types.ObjectId;
  emailVerified: boolean;
  phoneVerified: boolean;
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'business', 'admin'],
      default: 'customer',
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: String,
    avatar: String,
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokens: [String],
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);

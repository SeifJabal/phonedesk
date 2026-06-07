import mongoose, { Schema, Document } from 'mongoose';

export interface IShop extends Document {
  businessName: string;
  slug: string;
  description: string;
  shortDescription: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    complement?: string;
    postalCode: string;
    city: string;
    citySlug: string;
    region: string;
    regionSlug: string;
    country: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  hours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  deviceTypes: string[];
  brands: string[];
  serviceTypes: string[];
  features: {
    atHomeService: boolean;
    expressRepair: boolean;
    warranty: boolean;
    warrantyDuration?: number;
    originalParts: boolean;
    dataRecovery: boolean;
    freeEstimate: boolean;
  };
  logo?: string;
  coverImage?: string;
  photos: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    snapchat?: string;
  };
  rating: {
    average: number;
    count: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  metrics: {
    totalRepairs: number;
    responseTime: number;
    repeatCustomers: number;
    viewCount: number;
    quoteRequestCount: number;
    bookingCount: number;
  };
  verified: boolean;
  verifiedDate?: Date;
  status: 'pending' | 'active' | 'suspended' | 'closed';
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
  };
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}

const ShopSchema = new Schema<IShop>(
  {
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      minlength: [3, 'Business name must be at least 3 characters'],
      maxlength: [100, 'Business name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [160, 'Short description cannot exceed 160 characters'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: String,
    address: {
      street: { type: String, required: true },
      complement: String,
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      citySlug: { type: String, required: true, index: true },
      region: { type: String, required: true },
      regionSlug: { type: String, required: true, index: true },
      country: { type: String, default: 'France' },
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    hours: {
      monday: { open: String, close: String, closed: { type: Boolean, default: false } },
      tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
      friday: { open: String, close: String, closed: { type: Boolean, default: false } },
      saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
      sunday: { open: String, close: String, closed: { type: Boolean, default: true } },
    },
    deviceTypes: [{ type: String, index: true }],
    brands: [{ type: String, index: true }],
    serviceTypes: [{ type: String }],
    features: {
      atHomeService: { type: Boolean, default: false },
      expressRepair: { type: Boolean, default: false },
      warranty: { type: Boolean, default: false },
      warrantyDuration: Number,
      originalParts: { type: Boolean, default: false },
      dataRecovery: { type: Boolean, default: false },
      freeEstimate: { type: Boolean, default: true },
    },
    logo: String,
    coverImage: String,
    photos: [
      {
        url: String,
        caption: String,
        order: Number,
      },
    ],
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
      tiktok: String,
      youtube: String,
      snapchat: String,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
      distribution: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 },
      },
    },
    metrics: {
      totalRepairs: { type: Number, default: 0 },
      responseTime: { type: Number, default: 0 },
      repeatCustomers: { type: Number, default: 0 },
      viewCount: { type: Number, default: 0 },
      quoteRequestCount: { type: Number, default: 0 },
      bookingCount: { type: Number, default: 0 },
    },
    verified: { type: Boolean, default: false },
    verifiedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'closed'],
      default: 'pending',
      index: true,
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'premium', 'enterprise'],
        default: 'free',
      },
      startDate: Date,
      endDate: Date,
      autoRenew: { type: Boolean, default: false },
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastActiveAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
ShopSchema.index({ 'address.coordinates': '2dsphere' });
ShopSchema.index({ 'rating.average': -1 });
ShopSchema.index({ status: 1, verified: 1 });

export default mongoose.model<IShop>('Shop', ShopSchema);

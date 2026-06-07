import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  name: string;
  slug: string;
  postalCodes: string[];
  regionId: mongoose.Types.ObjectId;
  regionSlug: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  stats: {
    shopCount: number;
    reviewCount: number;
    averageRating: number;
    population?: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    content: string;
    keywords: string[];
  };
  isActive: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema = new Schema<ICity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    postalCodes: [String],
    regionId: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: true,
    },
    regionSlug: {
      type: String,
      required: true,
      index: true,
    },
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
    stats: {
      shopCount: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      population: Number,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      h1: String,
      content: String,
      keywords: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CitySchema.index({ coordinates: '2dsphere' });

export default mongoose.model<ICity>('City', CitySchema);

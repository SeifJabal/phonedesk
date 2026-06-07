import mongoose, { Schema, Document } from 'mongoose';

export interface IRegion extends Document {
  name: string;
  slug: string;
  code: string;
  country: string;
  stats: {
    shopCount: number;
    cityCount: number;
    reviewCount: number;
    averageRating: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    content: string;
    keywords: string[];
  };
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const RegionSchema = new Schema<IRegion>(
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
    code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'France',
    },
    stats: {
      shopCount: { type: Number, default: 0 },
      cityCount: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
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
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRegion>('Region', RegionSchema);

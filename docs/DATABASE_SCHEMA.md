# MongoDB Database Schema Design

## Collections Overview

```
phonodesk_db/
├── users
├── shops
├── services
├── reviews
├── quotes
├── bookings
├── regions
├── cities
├── devices
├── brands
├── notifications
└── admin_logs
```

---

## 1. Users Collection

### Purpose
Store customer and business owner accounts

### Schema
```typescript
{
  _id: ObjectId,
  email: string,              // Unique, indexed
  password: string,           // Bcrypt hashed
  role: enum,                 // 'customer' | 'business' | 'admin'
  
  // Profile
  firstName: string,
  lastName: string,
  phone: string,
  avatar: string,             // URL to S3
  
  // Location
  address: {
    street: string,
    city: string,
    postalCode: string,
    region: string,
    country: string,
    coordinates: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  },
  
  // Business owners only
  shopId: ObjectId,           // Reference to shops collection
  
  // Preferences
  preferences: {
    notifications: {
      email: boolean,
      sms: boolean,
      push: boolean
    },
    newsletter: boolean,
    language: string          // 'fr' | 'en'
  },
  
  // Security
  emailVerified: boolean,
  phoneVerified: boolean,
  twoFactorEnabled: boolean,
  refreshTokens: [string],    // Array of valid refresh tokens
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: boolean,
  isSuspended: boolean,
  suspensionReason: string
}
```

### Indexes
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ shopId: 1 })
db.users.createIndex({ createdAt: -1 })
```

---

## 2. Shops Collection

### Purpose
Store repair shop business profiles

### Schema
```typescript
{
  _id: ObjectId,
  
  // Basic Info
  businessName: string,
  slug: string,               // URL-friendly, unique, indexed
  description: string,
  shortDescription: string,   // Max 160 chars for SEO
  
  // Contact
  email: string,
  phone: string,
  website: string,
  
  // Location
  address: {
    street: string,
    complement: string,
    postalCode: string,
    city: string,
    citySlug: string,         // Reference to cities.slug
    region: string,
    regionSlug: string,       // Reference to regions.slug
    country: string,
    coordinates: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  },
  
  // Operating Hours
  hours: {
    monday: { open: string, close: string, closed: boolean },
    tuesday: { open: string, close: string, closed: boolean },
    wednesday: { open: string, close: string, closed: boolean },
    thursday: { open: string, close: string, closed: boolean },
    friday: { open: string, close: string, closed: boolean },
    saturday: { open: string, close: string, closed: boolean },
    sunday: { open: string, close: string, closed: boolean }
  },
  
  // Services
  deviceTypes: [string],      // ['smartphone', 'tablet', 'computer', 'console', 'watch']
  brands: [string],           // ['apple', 'samsung', 'google', etc.]
  serviceTypes: [string],     // ['screen', 'battery', 'camera', etc.]
  
  // Features
  features: {
    atHomeService: boolean,
    expressRepair: boolean,
    warranty: boolean,
    warrantyDuration: number, // Days
    originalParts: boolean,
    dataRecovery: boolean,
    freeEstimate: boolean
  },
  
  // Media
  logo: string,               // URL to S3
  coverImage: string,
  photos: [{
    url: string,
    caption: string,
    order: number
  }],
  
  // Social Media
  socialMedia: {
    instagram: string,
    facebook: string,
    twitter: string,
    tiktok: string,
    youtube: string,
    snapchat: string
  },
  
  // Ratings & Reviews
  rating: {
    average: number,          // 0-5, calculated
    count: number,            // Total reviews
    distribution: {
      5: number,
      4: number,
      3: number,
      2: number,
      1: number
    }
  },
  
  // Business Metrics
  metrics: {
    totalRepairs: number,
    responseTime: number,     // Average in minutes
    repeatCustomers: number,
    viewCount: number,
    quoteRequestCount: number,
    bookingCount: number
  },
  
  // Promotions
  currentPromo: {
    active: boolean,
    title: string,
    description: string,
    validUntil: Date
  },
  
  // Verification & Status
  verified: boolean,
  verifiedDate: Date,
  verificationDocuments: [string],
  status: enum,              // 'pending' | 'active' | 'suspended' | 'closed'
  
  // Subscription
  subscription: {
    plan: enum,              // 'free' | 'basic' | 'premium' | 'enterprise'
    startDate: Date,
    endDate: Date,
    autoRenew: boolean,
    features: [string]
  },
  
  // SEO
  seo: {
    metaTitle: string,
    metaDescription: string,
    keywords: [string],
    structuredData: Object   // Schema.org JSON-LD
  },
  
  // Metadata
  ownerId: ObjectId,         // Reference to users collection
  createdAt: Date,
  updatedAt: Date,
  lastActiveAt: Date
}
```

### Indexes
```javascript
db.shops.createIndex({ slug: 1 }, { unique: true })
db.shops.createIndex({ 'address.citySlug': 1, status: 1 })
db.shops.createIndex({ 'address.regionSlug': 1, status: 1 })
db.shops.createIndex({ 'address.coordinates': '2dsphere' })
db.shops.createIndex({ 'rating.average': -1 })
db.shops.createIndex({ status: 1, verified: 1 })
db.shops.createIndex({ deviceTypes: 1, brands: 1 })
db.shops.createIndex({ createdAt: -1 })
```

---

## 3. Services Collection

### Purpose
Store individual repair services offered by shops

### Schema
```typescript
{
  _id: ObjectId,
  shopId: ObjectId,          // Reference to shops
  
  // Service Details
  name: string,              // e.g., "iPhone 14 Pro Screen Replacement"
  description: string,
  
  // Device Info
  deviceType: string,        // 'smartphone' | 'tablet' | 'computer' | 'console' | 'watch'
  brand: string,             // 'apple' | 'samsung' | 'google' | etc.
  model: string,             // 'iPhone 14 Pro' | 'Galaxy S23' | etc.
  
  // Service Type
  serviceType: string,       // 'screen' | 'battery' | 'camera' | 'water-damage' | etc.
  
  // Pricing
  price: number,
  priceRange: {
    min: number,
    max: number
  },
  currency: string,          // 'EUR'
  
  // Time
  duration: number,          // Minutes
  durationRange: {
    min: number,
    max: number
  },
  
  // Options
  options: [{
    name: string,
    description: string,
    priceModifier: number,   // +50 or -20
    selected: boolean
  }],
  
  // Parts
  partsInfo: {
    type: enum,              // 'original' | 'oem' | 'aftermarket'
    warranty: number,        // Days
    inStock: boolean
  },
  
  // Availability
  available: boolean,
  availabilityNote: string,  // "Back ordered, 3-5 days"
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  isActive: boolean,
  viewCount: number,
  orderCount: number
}
```

### Indexes
```javascript
db.services.createIndex({ shopId: 1, isActive: 1 })
db.services.createIndex({ deviceType: 1, brand: 1, model: 1 })
db.services.createIndex({ serviceType: 1 })
db.services.createIndex({ price: 1 })
```

---

## 4. Reviews Collection

### Purpose
Store customer reviews and ratings for shops

### Schema
```typescript
{
  _id: ObjectId,
  shopId: ObjectId,          // Reference to shops
  userId: ObjectId,          // Reference to users
  
  // Review Content
  rating: number,            // 1-5
  title: string,
  content: string,
  
  // Service Details
  serviceType: string,
  deviceType: string,
  repairDate: Date,
  
  // Media
  photos: [string],          // URLs to S3
  
  // Response
  response: {
    content: string,
    respondedAt: Date,
    respondedBy: ObjectId    // Shop owner
  },
  
  // Verification
  verified: boolean,         // Verified purchase
  verificationMethod: string, // 'booking' | 'receipt' | 'manual'
  
  // Helpfulness
  helpful: {
    yes: number,
    no: number,
    voters: [ObjectId]       // Prevent double voting
  },
  
  // Moderation
  status: enum,              // 'pending' | 'approved' | 'rejected' | 'flagged'
  moderationNotes: string,
  flagCount: number,
  flagReasons: [string],
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  isEdited: boolean,
  editedAt: Date
}
```

### Indexes
```javascript
db.reviews.createIndex({ shopId: 1, status: 1, createdAt: -1 })
db.reviews.createIndex({ userId: 1 })
db.reviews.createIndex({ rating: 1 })
db.reviews.createIndex({ verified: 1 })
db.reviews.createIndex({ createdAt: -1 })
```

---

## 5. Quotes Collection

### Purpose
Store quote requests from customers

### Schema
```typescript
{
  _id: ObjectId,
  quoteNumber: string,       // Auto-generated, unique, indexed
  
  // Customer Info
  userId: ObjectId,          // Reference to users (optional, can be guest)
  customerEmail: string,
  customerPhone: string,
  customerName: string,
  
  // Shop Info
  shopId: ObjectId,          // Reference to shops
  
  // Device Info
  deviceType: string,
  brand: string,
  model: string,
  
  // Issue Details
  serviceType: string,
  issueDescription: string,
  photos: [string],          // URLs to S3
  urgency: enum,             // 'standard' | 'urgent' | 'express'
  
  // Preferences
  preferredDate: Date,
  preferredTime: string,
  atHomeService: boolean,
  address: {
    street: string,
    city: string,
    postalCode: string
  },
  
  // Quote Response
  response: {
    price: number,
    duration: number,
    availableDate: Date,
    notes: string,
    respondedAt: Date,
    respondedBy: ObjectId
  },
  
  // Status
  status: enum,              // 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired'
  statusHistory: [{
    status: string,
    date: Date,
    note: string
  }],
  
  // Conversion
  convertedToBooking: boolean,
  bookingId: ObjectId,
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date
}
```

### Indexes
```javascript
db.quotes.createIndex({ quoteNumber: 1 }, { unique: true })
db.quotes.createIndex({ shopId: 1, status: 1, createdAt: -1 })
db.quotes.createIndex({ userId: 1 })
db.quotes.createIndex({ status: 1, expiresAt: 1 })
db.quotes.createIndex({ createdAt: -1 })
```

---

## 6. Regions Collection

### Purpose
Store geographic regions (e.g., Île-de-France)

### Schema
```typescript
{
  _id: ObjectId,
  name: string,              // "Île-de-France"
  slug: string,              // "idf", unique, indexed
  code: string,              // Region code
  country: string,           // "France"
  
  // Geography
  coordinates: {
    type: 'Polygon',
    coordinates: [[[lng, lat], ...]]
  },
  
  // Statistics
  stats: {
    shopCount: number,
    cityCount: number,
    reviewCount: number,
    averageRating: number
  },
  
  // SEO
  seo: {
    metaTitle: string,
    metaDescription: string,
    h1: string,
    content: string,         // Rich content for SEO
    keywords: [string]
  },
  
  // Metadata
  isActive: boolean,
  order: number,             // Display order
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
```javascript
db.regions.createIndex({ slug: 1 }, { unique: true })
db.regions.createIndex({ isActive: 1, order: 1 })
```

---

## 7. Cities Collection

### Purpose
Store cities within regions

### Schema
```typescript
{
  _id: ObjectId,
  name: string,              // "Mantes-la-Jolie"
  slug: string,              // "mantes-la-jolie", unique, indexed
  postalCodes: [string],     // ["78200", "78201"]
  
  // Region
  regionId: ObjectId,        // Reference to regions
  regionSlug: string,
  
  // Geography
  coordinates: {
    type: 'Point',
    coordinates: [lng, lat]
  },
  
  // Statistics
  stats: {
    shopCount: number,
    reviewCount: number,
    averageRating: number,
    population: number
  },
  
  // SEO
  seo: {
    metaTitle: string,
    metaDescription: string,
    h1: string,
    content: string,
    keywords: [string]
  },
  
  // Metadata
  isActive: boolean,
  featured: boolean,
  order: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
```javascript
db.cities.createIndex({ slug: 1 }, { unique: true })
db.cities.createIndex({ regionSlug: 1, isActive: 1 })
db.cities.createIndex({ 'coordinates': '2dsphere' })
db.cities.createIndex({ featured: 1, order: 1 })
```

---

## 8. Devices Collection

### Purpose
Master list of device models for search/filter

### Schema
```typescript
{
  _id: ObjectId,
  brand: string,             // "Apple"
  brandSlug: string,         // "apple"
  model: string,             // "iPhone 14 Pro"
  modelSlug: string,         // "iphone-14-pro"
  deviceType: string,        // "smartphone"
  
  // Details
  releaseYear: number,
  imageUrl: string,
  specs: {
    screenSize: string,
    storage: [string],
    colors: [string]
  },
  
  // Common Repairs
  commonIssues: [string],
  averageRepairCost: {
    screen: number,
    battery: number,
    camera: number
  },
  
  // Metadata
  isActive: boolean,
  popularity: number,        // Search count
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
```javascript
db.devices.createIndex({ brandSlug: 1, modelSlug: 1 }, { unique: true })
db.devices.createIndex({ deviceType: 1, isActive: 1 })
db.devices.createIndex({ popularity: -1 })
```

---

## 9. Notifications Collection

### Purpose
Store system notifications for users

### Schema
```typescript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to users
  
  // Notification Content
  type: enum,                // 'quote' | 'review' | 'booking' | 'system'
  title: string,
  message: string,
  actionUrl: string,
  
  // Related Entities
  relatedEntity: {
    type: string,            // 'shop' | 'quote' | 'review'
    id: ObjectId
  },
  
  // Status
  read: boolean,
  readAt: Date,
  dismissed: boolean,
  
  // Delivery
  channels: {
    inApp: boolean,
    email: boolean,
    sms: boolean,
    push: boolean
  },
  sentAt: {
    email: Date,
    sms: Date,
    push: Date
  },
  
  // Metadata
  createdAt: Date,
  expiresAt: Date
}
```

### Indexes
```javascript
db.notifications.createIndex({ userId: 1, read: 1, createdAt: -1 })
db.notifications.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

## 10. Admin Logs Collection

### Purpose
Audit trail for admin actions

### Schema
```typescript
{
  _id: ObjectId,
  adminId: ObjectId,         // Reference to users
  action: string,            // 'approve_shop' | 'suspend_user' | etc.
  entity: {
    type: string,            // 'shop' | 'user' | 'review'
    id: ObjectId
  },
  details: Object,           // Action-specific details
  ipAddress: string,
  userAgent: string,
  createdAt: Date
}
```

### Indexes
```javascript
db.adminLogs.createIndex({ adminId: 1, createdAt: -1 })
db.adminLogs.createIndex({ 'entity.type': 1, 'entity.id': 1 })
db.adminLogs.createIndex({ createdAt: -1 })
```

---

## Relationships Diagram

```
users (1) ──────► (1) shops
  │                   │
  │                   │
  ▼                   ▼
reviews (N) ──────► (1) shops
  │                   │
  │                   │
  ▼                   ▼
quotes (N) ──────► (1) shops
                    │
                    ▼
                 services (N)

regions (1) ──────► (N) cities
  │                     │
  │                     │
  └─────────────────────┴───► (N) shops
```

---

## Data Validation with Mongoose

### Example: Shop Schema Validation
```typescript
const shopSchema = new Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
    minlength: [3, 'Business name must be at least 3 characters'],
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(\+33|0)[1-9](\d{2}){4}$/.test(v),
      message: 'Invalid French phone number'
    }
  },
  'rating.average': {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});
```

---

## Sample Data

### Sample Shop Document
```json
{
  "_id": "ObjectId('...')",
  "businessName": "Point Service Phone",
  "slug": "point-service-phone-mantes-la-jolie",
  "description": "La référence pour une réparation de téléphone rapide...",
  "email": "contact@pointservicephone.fr",
  "phone": "+33971185372",
  "address": {
    "street": "2 Rue la Fontaine",
    "postalCode": "78200",
    "city": "Mantes-la-Jolie",
    "citySlug": "mantes-la-jolie",
    "region": "Île-de-France",
    "regionSlug": "idf",
    "coordinates": {
      "type": "Point",
      "coordinates": [1.7167, 48.9833]
    }
  },
  "hours": {
    "monday": { "open": "10:00", "close": "19:00", "closed": false },
    "sunday": { "open": "", "close": "", "closed": true }
  },
  "deviceTypes": ["smartphone", "tablet", "computer", "console", "watch"],
  "brands": ["apple", "samsung", "google", "huawei", "xiaomi"],
  "features": {
    "atHomeService": true,
    "expressRepair": true,
    "warranty": true,
    "warrantyDuration": 90
  },
  "rating": {
    "average": 4.9,
    "count": 1207,
    "distribution": {
      "5": 1150,
      "4": 45,
      "3": 8,
      "2": 2,
      "1": 2
    }
  },
  "verified": true,
  "status": "active",
  "subscription": {
    "plan": "premium",
    "startDate": "2024-01-01",
    "endDate": "2027-01-01"
  }
}
```

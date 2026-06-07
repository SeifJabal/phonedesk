# PhoneDesk Platform - System Architecture

## Business Model Analysis

### Core Value Proposition
PhoneDesk is a **marketplace platform** connecting consumers with local phone repair shops. It serves as a discovery, comparison, and booking platform for device repair services.

### Key Stakeholders
1. **End Users (Consumers)** - Need device repairs
2. **Repair Shop Owners** - Want to attract customers
3. **Platform (PhoneDesk)** - Facilitates connections

### Revenue Streams
1. **Listing Fees** - Shops pay for premium placement
2. **Commission** - % of each booking/repair
3. **Featured Listings** - Promoted shop profiles
4. **Premium Features** - Advanced analytics, priority support
5. **Advertising** - Sponsored results, banner ads

### Core Features Analysis

#### Public Features
- **Location-based search** - Find shops by region/city
- **Service catalog** - Browse repair types (screen, battery, etc.)
- **Device selection** - Smartphone, tablet, computer, console, watch
- **Brand filtering** - Apple, Samsung, Google, Huawei, etc.
- **Quote system** - Get instant price estimates
- **Reviews & ratings** - Social proof (4.9/5 with 1207+ reviews)
- **Shop profiles** - Details, hours, location, services
- **Mobile service** - At-home/office repair booking
- **Guarantees** - Warranty information
- **Promotions** - Special offers (e.g., free screen protector)

#### Business Owner Features
- **Dashboard** - Manage shop profile
- **Quote management** - Respond to quote requests
- **Calendar** - Booking management
- **Analytics** - Performance metrics
- **Service catalog** - Update pricing & availability
- **Review responses** - Engage with customers

#### Admin Features
- **Shop approval** - Verify new listings
- **Content moderation** - Review management
- **Platform analytics** - Usage metrics
- **User management** - Handle disputes
- **SEO tools** - Meta management for location pages

---

## Technical Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                     Load Balancer                        │
│                  (Future: AWS ELB/Nginx)                 │
└────────────────────┬────────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┐
       │                           │
┌──────▼──────┐            ┌──────▼──────┐
│   Next.js   │            │   Next.js   │
│   Server    │            │   Server    │
│  (Frontend) │            │  (Frontend) │
└──────┬──────┘            └──────┬──────┘
       │                           │
       └─────────────┬─────────────┘
                     │
           ┌─────────▼─────────┐
           │  Express.js API   │
           │   (Backend)       │
           └─────────┬─────────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
┌──────▼──────┐ ┌───▼────┐  ┌────▼────┐
│  MongoDB    │ │ Redis  │  │  S3/    │
│  Database   │ │ Cache  │  │ Storage │
└─────────────┘ └────────┘  └─────────┘
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: React Context + TanStack Query
- **Maps**: Mapbox GL JS or Google Maps
- **SEO**: Next.js Metadata API

#### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Authentication**: JWT + HTTP-only cookies
- **Caching**: Redis
- **File Upload**: Multer + Sharp (image processing)
- **Validation**: Zod
- **API Docs**: Swagger/OpenAPI

#### DevOps & Infrastructure
- **Hosting**: Vercel (Frontend) + AWS/DigitalOcean (Backend)
- **Database**: MongoDB Atlas
- **Cache**: Redis Cloud
- **Storage**: AWS S3 / Cloudinary
- **CDN**: Cloudflare
- **Monitoring**: Sentry (errors) + Vercel Analytics
- **CI/CD**: GitHub Actions

### Security Architecture

#### Authentication & Authorization
```typescript
// JWT Token Strategy
Access Token: Short-lived (15min), stored in memory
Refresh Token: Long-lived (7d), HTTP-only cookie
```

#### Security Layers
1. **Input Validation** - Zod schemas on all endpoints
2. **Rate Limiting** - Express rate limit + Redis
3. **CORS** - Strict origin whitelist
4. **Helmet.js** - Security headers
5. **MongoDB Injection** - Mongoose sanitization
6. **XSS Protection** - DOMPurify on frontend
7. **CSRF Tokens** - For state-changing operations
8. **Password Hashing** - bcrypt (10 rounds)
9. **File Upload** - Type validation, size limits, virus scanning

### Performance Strategy

#### Frontend Optimization
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Next.js Font optimization
- **Lazy Loading** - React.lazy for heavy components
- **Memoization** - React.memo, useMemo, useCallback
- **Prefetching** - Next.js Link prefetch
- **Static Generation** - ISR for location pages

#### Backend Optimization
- **Redis Caching**
  - Shop listings: 5min TTL
  - Location data: 1hr TTL
  - Reviews: 10min TTL
- **Database Indexing**
  - Geospatial indexes for location queries
  - Compound indexes for common filters
- **API Response Compression** - gzip/brotli
- **Connection Pooling** - MongoDB & Redis
- **CDN** - Static assets via Cloudflare

### Scalability Design

#### Horizontal Scaling
- **Stateless API** - No session storage on servers
- **Load Balancing** - Round-robin distribution
- **Database Sharding** - Geographic sharding by region
- **Microservices Ready** - Domain-driven design

#### Vertical Scaling
- **Database** - MongoDB Atlas auto-scaling
- **Caching** - Redis cluster mode
- **Compute** - Container-based deployment

---

## Data Flow Architecture

### User Journey: Finding a Repair Shop
```
1. User visits homepage
2. Selects region (e.g., Île-de-France)
3. Selects city (e.g., Mantes-la-Jolie)
4. Views list of repair shops
5. Clicks on shop (e.g., Point Service Phone)
6. Views shop details, services, reviews
7. Selects device & repair type
8. Gets instant quote
9. Books appointment or contacts shop
```

### Data Flow
```
┌──────────┐
│  Client  │
└────┬─────┘
     │ 1. GET /api/regions
     ▼
┌──────────────┐
│  API Server  │◄──── Check Redis Cache
└────┬─────────┘
     │ 2. Cache miss
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │ 3. Return data
     ▼
┌──────────────┐
│  API Server  │────► Store in Redis (5min TTL)
└────┬─────────┘
     │ 4. Return JSON
     ▼
┌──────────┐
│  Client  │────► Render UI
└──────────┘
```

---

## API Architecture

### RESTful API Design

#### Base URL
```
Production: https://api.phonodesk.com/v1
Development: http://localhost:5000/api/v1
```

#### Endpoint Structure
```
/api/v1/regions                 # GET - List regions
/api/v1/regions/:slug           # GET - Region details
/api/v1/regions/:slug/cities    # GET - Cities in region
/api/v1/cities/:slug            # GET - City details
/api/v1/cities/:slug/shops      # GET - Shops in city
/api/v1/shops                   # GET - Search/filter shops
/api/v1/shops/:id               # GET - Shop details
/api/v1/shops/:id/reviews       # GET, POST - Shop reviews
/api/v1/shops/:id/services      # GET - Shop services
/api/v1/quotes                  # POST - Request quote
/api/v1/auth/register           # POST - User registration
/api/v1/auth/login              # POST - Login
/api/v1/auth/refresh            # POST - Refresh token
/api/v1/auth/logout             # POST - Logout
/api/v1/users/me                # GET, PATCH - Current user
/api/v1/dashboard/stats         # GET - Business dashboard
/api/v1/admin/shops             # GET, POST, PATCH, DELETE
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

## Frontend Architecture

### Next.js App Router Structure
```
app/
├── (marketing)/              # Public pages layout
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Marketing layout
│   └── [region]/            # Dynamic region
│       ├── page.tsx         # Region page
│       └── [city]/          # Dynamic city
│           ├── page.tsx     # City page
│           └── [shop]/      # Dynamic shop
│               └── page.tsx # Shop detail
├── (dashboard)/             # Protected dashboard
│   ├── layout.tsx          # Dashboard layout
│   ├── page.tsx            # Overview
│   ├── quotes/             # Quote management
│   ├── services/           # Service management
│   └── analytics/          # Analytics
├── (admin)/                # Admin panel
├── api/                    # API routes (auth, webhooks)
├── layout.tsx              # Root layout
└── globals.css             # Global styles
```

### Component Architecture
```
components/
├── ui/                     # shadcn/ui primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── layout/                 # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── shop/                   # Shop-related
│   ├── ShopCard.tsx
│   ├── ShopGrid.tsx
│   ├── ShopDetails.tsx
│   └── ShopReviews.tsx
├── search/                 # Search components
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   └── LocationSelector.tsx
├── quote/                  # Quote system
│   ├── QuoteForm.tsx
│   ├── DeviceSelector.tsx
│   └── ServiceSelector.tsx
└── common/                 # Shared components
    ├── Map.tsx
    ├── ImageGallery.tsx
    ├── Rating.tsx
    └── LoadingSpinner.tsx
```

### State Management Strategy
- **Server State**: TanStack Query (React Query)
- **UI State**: React useState/useReducer
- **Global State**: React Context (auth, theme)
- **Form State**: React Hook Form
- **URL State**: Next.js searchParams

---

## Deployment Architecture

### Production Environment
```
Frontend: Vercel
- Auto-deploy from main branch
- Edge functions for API routes
- CDN for static assets
- Environment variables in Vercel

Backend: AWS EC2 / DigitalOcean Droplet
- Docker container
- PM2 process manager
- Nginx reverse proxy
- SSL via Let's Encrypt

Database: MongoDB Atlas
- M10 cluster (production)
- Auto-scaling enabled
- Daily backups

Cache: Redis Cloud
- 1GB instance
- High availability

Storage: AWS S3
- Image uploads
- CloudFront CDN
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
1. Run tests (Jest, Playwright)
2. Run linting (ESLint, Prettier)
3. Build frontend (Next.js)
4. Build backend (Docker image)
5. Deploy to staging
6. Run E2E tests
7. Deploy to production (manual approval)
```

---

## Monitoring & Analytics

### Error Tracking
- **Sentry** - Frontend & backend errors
- **Log aggregation** - Winston + CloudWatch

### Performance Monitoring
- **Vercel Analytics** - Web vitals, page speed
- **New Relic / DataDog** - API performance
- **MongoDB Atlas** - Query performance

### Business Analytics
- **Custom dashboard** - User signups, bookings, revenue
- **Google Analytics 4** - User behavior
- **Mixpanel** - Funnel analysis

---

## Accessibility & Compliance

### WCAG 2.1 Level AA
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast (4.5:1)
- Screen reader support

### Legal Compliance
- GDPR compliance
- Cookie consent
- Privacy policy
- Terms of service
- Data retention policies

---

## Development Workflow

### Git Strategy
```
main          # Production
├── staging   # Pre-production
└── develop   # Development
    └── feature/* # Feature branches
```

### Code Quality
- **TypeScript** - Strict mode
- **ESLint** - Airbnb config
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks
- **Jest** - Unit tests (>80% coverage)
- **Playwright** - E2E tests

### Documentation
- **API Docs** - Swagger/OpenAPI
- **Component Docs** - Storybook
- **README** - Setup instructions
- **Architecture Docs** - This file

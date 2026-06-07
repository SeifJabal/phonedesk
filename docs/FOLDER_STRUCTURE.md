# Project Folder Structure

## Complete Directory Layout

```
phone/
├── frontend/                           # Next.js 15 Application
│   ├── app/                           # App Router (Next.js 15)
│   │   ├── (marketing)/               # Marketing layout group
│   │   │   ├── layout.tsx             # Marketing layout
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── [region]/              # Dynamic region routes
│   │   │   │   ├── page.tsx           # Region page
│   │   │   │   └── [city]/            # Dynamic city routes
│   │   │   │       ├── page.tsx       # City page
│   │   │   │       └── [shopSlug]/    # Dynamic shop routes
│   │   │   │           └── page.tsx   # Shop detail page
│   │   │   └── search/
│   │   │       └── page.tsx           # Search results
│   │   │
│   │   ├── (dashboard)/               # Dashboard layout group (protected)
│   │   │   ├── layout.tsx             # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx           # Dashboard home
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── shop/              # Shop management
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── services/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── quotes/            # Quote management
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── reviews/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── middleware.ts          # Auth middleware
│   │   │
│   │   ├── (admin)/                   # Admin panel (super protected)
│   │   │   ├── layout.tsx
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── shops/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── users/
│   │   │       │   └── page.tsx
│   │   │       ├── reviews/
│   │   │       │   └── page.tsx
│   │   │       ├── analytics/
│   │   │       │   └── page.tsx
│   │   │       └── settings/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (auth)/                    # Auth pages (centered layout)
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                       # API routes (Next.js)
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify/
│   │   │   │       └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles
│   │   ├── not-found.tsx              # 404 page
│   │   └── error.tsx                  # Error boundary
│   │
│   ├── components/                     # React components
│   │   ├── ui/                        # shadcn/ui primitives
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   │
│   │   ├── shop/                      # Shop-related components
│   │   │   ├── ShopCard.tsx
│   │   │   ├── ShopGrid.tsx
│   │   │   ├── ShopList.tsx
│   │   │   ├── ShopDetails.tsx
│   │   │   ├── ShopHeader.tsx
│   │   │   ├── ShopServices.tsx
│   │   │   ├── ShopReviews.tsx
│   │   │   ├── ShopHours.tsx
│   │   │   ├── ShopLocation.tsx
│   │   │   ├── ShopGallery.tsx
│   │   │   └── ShopContact.tsx
│   │   │
│   │   ├── search/                    # Search & filter components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── LocationSelector.tsx
│   │   │   ├── DeviceSelector.tsx
│   │   │   ├── BrandSelector.tsx
│   │   │   └── SortDropdown.tsx
│   │   │
│   │   ├── review/                    # Review components
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewList.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── ReviewStats.tsx
│   │   │   ├── ReviewFilter.tsx
│   │   │   └── Rating.tsx
│   │   │
│   │   ├── quote/                     # Quote system components
│   │   │   ├── QuoteForm.tsx
│   │   │   ├── QuoteWizard.tsx
│   │   │   ├── DeviceSelector.tsx
│   │   │   ├── IssueSelector.tsx
│   │   │   ├── ServiceSelector.tsx
│   │   │   ├── DateTimePicker.tsx
│   │   │   ├── QuoteCard.tsx
│   │   │   └── QuoteSummary.tsx
│   │   │
│   │   ├── dashboard/                 # Dashboard components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── RecentQuotes.tsx
│   │   │   ├── RecentReviews.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   └── QuickActions.tsx
│   │   │
│   │   ├── forms/                     # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ShopForm.tsx
│   │   │   ├── ServiceForm.tsx
│   │   │   └── ProfileForm.tsx
│   │   │
│   │   ├── common/                    # Shared components
│   │   │   ├── Map.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   └── ScrollToTop.tsx
│   │   │
│   │   ├── animations/                # Framer Motion animations
│   │   │   ├── FadeIn.tsx
│   │   │   ├── SlideIn.tsx
│   │   │   ├── ScaleIn.tsx
│   │   │   └── PageTransition.tsx
│   │   │
│   │   └── providers/                 # Context providers
│   │       ├── AuthProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       └── ToastProvider.tsx
│   │
│   ├── lib/                           # Utility libraries
│   │   ├── api.ts                     # API client (Axios)
│   │   ├── auth.ts                    # Auth utilities
│   │   ├── utils.ts                   # General utilities
│   │   ├── cn.ts                      # Tailwind class merger
│   │   ├── validation.ts              # Zod schemas
│   │   ├── constants.ts               # App constants
│   │   ├── hooks/                     # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useGeolocation.ts
│   │   └── services/                  # API service functions
│   │       ├── shopService.ts
│   │       ├── reviewService.ts
│   │       ├── quoteService.ts
│   │       ├── authService.ts
│   │       └── uploadService.ts
│   │
│   ├── types/                         # TypeScript types
│   │   ├── index.ts
│   │   ├── shop.ts
│   │   ├── user.ts
│   │   ├── review.ts
│   │   ├── quote.ts
│   │   ├── service.ts
│   │   └── api.ts
│   │
│   ├── config/                        # Configuration files
│   │   ├── site.ts                    # Site metadata
│   │   ├── navigation.ts              # Navigation structure
│   │   └── seo.ts                     # SEO configuration
│   │
│   ├── styles/                        # Additional styles
│   │   └── animations.css             # Custom animations
│   │
│   ├── public/                        # Static assets
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero.webp
│   │   │   └── placeholder.png
│   │   ├── icons/
│   │   │   ├── favicon.ico
│   │   │   ├── icon-192.png
│   │   │   └── icon-512.png
│   │   └── fonts/
│   │       └── (font files if needed)
│   │
│   ├── .env.local                     # Environment variables
│   ├── .env.example                   # Example env file
│   ├── next.config.js                 # Next.js configuration
│   ├── tailwind.config.ts             # Tailwind configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── components.json                # shadcn/ui configuration
│   ├── package.json
│   └── .eslintrc.json
│
├── backend/                           # Express.js API Server
│   ├── src/
│   │   ├── config/                    # Configuration
│   │   │   ├── database.ts            # MongoDB connection
│   │   │   ├── redis.ts               # Redis connection
│   │   │   ├── env.ts                 # Environment validation
│   │   │   ├── cors.ts                # CORS settings
│   │   │   └── aws.ts                 # AWS S3 configuration
│   │   │
│   │   ├── models/                    # Mongoose models
│   │   │   ├── User.ts
│   │   │   ├── Shop.ts
│   │   │   ├── Service.ts
│   │   │   ├── Review.ts
│   │   │   ├── Quote.ts
│   │   │   ├── Booking.ts
│   │   │   ├── Region.ts
│   │   │   ├── City.ts
│   │   │   ├── Device.ts
│   │   │   ├── Notification.ts
│   │   │   └── AdminLog.ts
│   │   │
│   │   ├── controllers/               # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── shopController.ts
│   │   │   ├── serviceController.ts
│   │   │   ├── reviewController.ts
│   │   │   ├── quoteController.ts
│   │   │   ├── regionController.ts
│   │   │   ├── cityController.ts
│   │   │   ├── userController.ts
│   │   │   ├── uploadController.ts
│   │   │   └── adminController.ts
│   │   │
│   │   ├── routes/                    # Express routes
│   │   │   ├── index.ts               # Main router
│   │   │   ├── authRoutes.ts
│   │   │   ├── shopRoutes.ts
│   │   │   ├── serviceRoutes.ts
│   │   │   ├── reviewRoutes.ts
│   │   │   ├── quoteRoutes.ts
│   │   │   ├── regionRoutes.ts
│   │   │   ├── cityRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   ├── uploadRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   │
│   │   ├── middleware/                # Express middleware
│   │   │   ├── auth.ts                # JWT verification
│   │   │   ├── errorHandler.ts        # Error handling
│   │   │   ├── validate.ts            # Request validation
│   │   │   ├── rateLimit.ts           # Rate limiting
│   │   │   ├── cache.ts               # Redis caching
│   │   │   ├── upload.ts              # File upload (Multer)
│   │   │   ├── sanitize.ts            # Input sanitization
│   │   │   └── logger.ts              # Request logging
│   │   │
│   │   ├── services/                  # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── shopService.ts
│   │   │   ├── reviewService.ts
│   │   │   ├── quoteService.ts
│   │   │   ├── emailService.ts
│   │   │   ├── smsService.ts
│   │   │   ├── uploadService.ts
│   │   │   ├── searchService.ts
│   │   │   ├── cacheService.ts
│   │   │   └── analyticsService.ts
│   │   │
│   │   ├── utils/                     # Utility functions
│   │   │   ├── jwt.ts                 # JWT helpers
│   │   │   ├── bcrypt.ts              # Password hashing
│   │   │   ├── slug.ts                # Slug generation
│   │   │   ├── pagination.ts          # Pagination helpers
│   │   │   ├── validation.ts          # Validators
│   │   │   ├── logger.ts              # Winston logger
│   │   │   └── constants.ts           # Constants
│   │   │
│   │   ├── types/                     # TypeScript types
│   │   │   ├── index.ts
│   │   │   ├── express.d.ts           # Express type extensions
│   │   │   └── models.ts
│   │   │
│   │   ├── validators/                # Zod schemas
│   │   │   ├── authValidator.ts
│   │   │   ├── shopValidator.ts
│   │   │   ├── reviewValidator.ts
│   │   │   ├── quoteValidator.ts
│   │   │   └── userValidator.ts
│   │   │
│   │   ├── jobs/                      # Background jobs
│   │   │   ├── emailQueue.ts
│   │   │   ├── imageProcessor.ts
│   │   │   └── analyticsAggregator.ts
│   │   │
│   │   ├── app.ts                     # Express app setup
│   │   └── server.ts                  # Server entry point
│   │
│   ├── tests/                         # Tests
│   │   ├── unit/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── integration/
│   │   │   ├── auth.test.ts
│   │   │   ├── shops.test.ts
│   │   │   └── reviews.test.ts
│   │   └── setup.ts
│   │
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Example env file
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── package.json
│   ├── nodemon.json                   # Nodemon configuration
│   ├── jest.config.js                 # Jest configuration
│   └── Dockerfile                     # Docker configuration
│
├── shared/                            # Shared code (types, constants)
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       └── index.ts
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
│
├── scripts/                           # Utility scripts
│   ├── seed-database.ts               # Database seeding
│   ├── migrate.ts                     # Database migrations
│   ├── generate-sitemap.ts            # Sitemap generation
│   └── backup.sh                      # Backup script
│
├── .github/                           # GitHub configuration
│   ├── workflows/
│   │   ├── ci.yml                     # CI pipeline
│   │   ├── deploy-frontend.yml        # Frontend deployment
│   │   └── deploy-backend.yml         # Backend deployment
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docker-compose.yml                 # Docker Compose for local dev
├── .gitignore
├── .prettierrc                        # Prettier configuration
├── .eslintrc.json                     # ESLint configuration
├── package.json                       # Root package.json (workspace)
├── turbo.json                         # Turborepo configuration (optional)
└── README.md                          # Project documentation
```

## Key Design Decisions

### 1. Monorepo Structure
- **frontend/** - Next.js application
- **backend/** - Express.js API
- **shared/** - Shared TypeScript types and constants
- Easier dependency management and code sharing

### 2. Next.js App Router
- Using Next.js 15 App Router (not Pages Router)
- Route groups for different layouts: `(marketing)`, `(dashboard)`, `(admin)`, `(auth)`
- Server Components by default for better performance
- Client Components marked with `'use client'`

### 3. Clean Architecture
- **Separation of concerns**: Controllers → Services → Models
- **Business logic** in services, not controllers
- **Middleware** for cross-cutting concerns
- **Validators** separate from controllers

### 4. TypeScript Throughout
- Strict type checking
- Shared types between frontend and backend
- Type-safe API calls
- Better developer experience

### 5. Component Organization
- **UI components** - Reusable primitives (shadcn/ui)
- **Feature components** - Domain-specific (shop, review, quote)
- **Layout components** - Header, Footer, Sidebar
- **Common components** - Shared utilities

### 6. API Structure
- RESTful design
- Versioned (`/api/v1`)
- Grouped by resource
- Consistent response format

### 7. Configuration
- Environment variables for secrets
- Config files for application settings
- TypeScript config for type safety
- Separate dev/prod configurations

---

## Environment Variables

### Frontend (.env.local)
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyxxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/phonodesk
MONGODB_URI_TEST=mongodb://localhost:27017/phonodesk_test

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-west-3
AWS_S3_BUCKET=phonodesk-uploads

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
FROM_EMAIL=noreply@phonodesk.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+33xxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Setup Instructions

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd phone

# Install dependencies (root, frontend, backend)
npm install
cd frontend && npm install
cd ../backend && npm install

# Setup environment variables
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Start MongoDB & Redis (Docker)
docker-compose up -d mongodb redis

# Seed database
cd backend && npm run seed

# Start development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Development Workflow
```bash
# Frontend development
cd frontend
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript check

# Backend development
cd backend
npm run dev          # Start with nodemon (port 5000)
npm run build        # Compile TypeScript
npm test             # Run tests
npm run test:watch   # Watch mode
npm run lint         # Run ESLint
```

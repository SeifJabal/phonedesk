# PhoneDesk - Modern Phone Repair Marketplace Platform

A premium, production-ready platform connecting consumers with local phone repair shops. Built with modern technologies and best practices.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **TanStack Query** - Data fetching & caching
- **Axios** - HTTP client
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Redis** - Caching layer
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
phone/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   ├── components/
│   │   ├── lib/      # Utilities
│   │   ├── types/    # TypeScript types
│   │   └── config/   # Configuration
│   └── public/       # Static assets
├── backend/          # Express.js API
│   └── src/
│       ├── config/   # Database, Redis config
│       ├── models/   # Mongoose models
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       ├── services/
│       └── utils/
├── shared/           # Shared types & constants
├── docs/            # Documentation
└── scripts/         # Utility scripts
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20+ 
- MongoDB 6+
- Redis 7+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd phone
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Setup environment variables**
```bash
# Frontend (.env.local)
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your values

# Backend (.env)
cp backend/.env.example backend/.env
# Edit backend/.env with your values
```

4. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/v1

## 🎯 Features

### Public Features
- ✅ Location-based search (regions, cities)
- ✅ Shop listing & filtering
- ✅ Device type selection (smartphone, tablet, computer, etc.)
- ✅ Brand filtering (Apple, Samsung, Google, etc.)
- ⏳ Shop detail pages
- ⏳ Review system with ratings
- ⏳ Quote request system
- ⏳ Advanced search & filters
- ⏳ Interactive maps
- ⏳ Image galleries

### Business Owner Features
- ⏳ Shop management dashboard
- ⏳ Quote management
- ⏳ Service catalog management
- ⏳ Analytics & insights
- ⏳ Review responses
- ⏳ Booking management

### Admin Features
- ⏳ Shop verification & approval
- ⏳ User management
- ⏳ Content moderation
- ⏳ Platform analytics
- ⏳ SEO management

## 📚 API Endpoints

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.phonodesk.com/v1
```

### Available Endpoints
```
GET  /health                    # Health check
GET  /api/v1                    # API info
GET  /api/v1/shops              # List shops
GET  /api/v1/shops/:id          # Get shop
GET  /api/v1/regions            # List regions
GET  /api/v1/regions/:slug      # Get region
GET  /api/v1/cities/:slug       # Get city
```

## 🏗️ Architecture

### Frontend Architecture
- **App Router** - File-based routing with layouts
- **Server Components** - Default for better performance
- **Client Components** - For interactive features
- **API Routes** - Next.js API endpoints
- **Static Generation** - ISR for location pages

### Backend Architecture
- **RESTful API** - Standard REST conventions
- **MVC Pattern** - Models, Controllers, Routes
- **Service Layer** - Business logic separation
- **Middleware** - Auth, validation, error handling
- **Redis Caching** - Performance optimization

### Database Schema
See [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for complete schema design.

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Slate (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter
- **Scale**: Tailwind default scale
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Docker)
```bash
cd backend
docker build -t phonodesk-api .
docker run -p 5000:5000 phonodesk-api
```

## 📈 Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse Score**: > 90

## 🔒 Security

- Helmet.js for security headers
- CORS with origin whitelist
- Rate limiting (15 min window)
- JWT with refresh tokens
- Input validation (Zod)
- MongoDB injection prevention
- XSS protection

## 📝 Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Folder Structure](docs/FOLDER_STRUCTURE.md)
- [UI/UX Specification](docs/UI_UX_SPECIFICATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Principal Software Architect** - System design
- **Senior UX Designer** - UI/UX design
- **Full Stack Developers** - Implementation

## 📧 Contact

- Email: contact@phonodesk.fr
- Website: https://phonodesk.fr

---

**Status**: 🚧 In Development

**Version**: 1.0.0

**Last Updated**: June 7, 2026

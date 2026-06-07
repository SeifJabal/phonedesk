# UI/UX Specification

## Design Philosophy

### Core Principles
1. **Premium & Professional** - Inspired by Stripe, Vercel, and Airbnb
2. **Mobile-First** - 70% of traffic is mobile
3. **Fast & Performant** - Instant interactions, skeleton loading
4. **Accessible** - WCAG 2.1 AA compliant
5. **Intuitive** - Clear information hierarchy
6. **Trust-Building** - Social proof, verified badges, transparency

---

## Design System

### Color Palette

#### Primary Colors
```css
/* Indigo - Trust, professionalism */
--primary-50: #eef2ff;
--primary-100: #e0e7ff;
--primary-200: #c7d2fe;
--primary-300: #a5b4fc;
--primary-400: #818cf8;
--primary-500: #6366f1;  /* Main brand color */
--primary-600: #4f46e5;
--primary-700: #4338ca;
--primary-800: #3730a3;
--primary-900: #312e81;
```

#### Neutral Colors
```css
/* Slate - Clean, modern */
--gray-50: #f8fafc;
--gray-100: #f1f5f9;
--gray-200: #e2e8f0;
--gray-300: #cbd5e1;
--gray-400: #94a3b8;
--gray-500: #64748b;
--gray-600: #475569;
--gray-700: #334155;
--gray-800: #1e293b;
--gray-900: #0f172a;
```

#### Semantic Colors
```css
/* Success */
--success-500: #10b981;
--success-600: #059669;

/* Warning */
--warning-500: #f59e0b;
--warning-600: #d97706;

/* Error */
--error-500: #ef4444;
--error-600: #dc2626;

/* Info */
--info-500: #3b82f6;
--info-600: #2563eb;
```

### Typography

#### Font Family
```css
/* Primary - Inter (system font fallback) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - For code, numbers */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Font Scale
```css
/* Headings */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
```

#### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale
```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Border Radius
```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

---

## Component Specifications

### 1. Buttons

#### Primary Button
```tsx
// Large - CTA buttons
<button className="
  px-6 py-3 
  bg-primary-600 hover:bg-primary-700 
  text-white font-semibold 
  rounded-lg 
  shadow-md hover:shadow-lg 
  transition-all duration-200 
  active:scale-[0.98]
">
  Obtenir un devis gratuit
</button>

// Medium - Default
<button className="
  px-4 py-2 
  bg-primary-600 hover:bg-primary-700 
  text-white font-medium 
  rounded-md 
  transition-colors
">
  Continuer
</button>

// Small - Compact actions
<button className="
  px-3 py-1.5 text-sm 
  bg-primary-600 hover:bg-primary-700 
  text-white font-medium 
  rounded-md
">
  Voir plus
</button>
```

#### Secondary Button
```tsx
<button className="
  px-4 py-2 
  bg-white hover:bg-gray-50 
  text-gray-700 font-medium 
  border border-gray-300 
  rounded-md 
  transition-colors
">
  En savoir plus
</button>
```

#### Ghost Button
```tsx
<button className="
  px-4 py-2 
  text-primary-600 hover:text-primary-700 
  hover:bg-primary-50 
  font-medium 
  rounded-md 
  transition-colors
">
  Annuler
</button>
```

### 2. Cards

#### Shop Card
```tsx
<div className="
  group
  bg-white 
  border border-gray-200 
  rounded-xl 
  overflow-hidden 
  shadow-sm hover:shadow-xl 
  transition-all duration-300 
  hover:-translate-y-1
">
  {/* Image */}
  <div className="relative h-48 overflow-hidden">
    <img 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      src="..." 
      alt="..." 
    />
    {/* Verified Badge */}
    <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
      <CheckIcon /> Vérifié
    </div>
  </div>
  
  {/* Content */}
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">Point Service Phone</h3>
    <p className="text-gray-600 text-sm mb-4">Réparation express • Garantie 90j</p>
    
    {/* Rating */}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex">
        {/* 5 stars */}
      </div>
      <span className="text-lg font-bold">4.9</span>
      <span className="text-sm text-gray-500">(1,207 avis)</span>
    </div>
    
    {/* Location */}
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <MapPinIcon />
      <span>Mantes-la-Jolie, 78200</span>
    </div>
    
    {/* CTA */}
    <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
      Voir les services
    </button>
  </div>
</div>
```

### 3. Input Fields

#### Text Input
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input 
    type="email"
    className="
      w-full px-4 py-2.5 
      border border-gray-300 
      rounded-lg 
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
      outline-none 
      transition-all
      placeholder:text-gray-400
    "
    placeholder="votre@email.fr"
  />
  <p className="text-sm text-gray-500">Nous ne partagerons jamais votre email.</p>
</div>
```

#### Search Input
```tsx
<div className="relative">
  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
  <input 
    type="search"
    className="
      w-full pl-12 pr-4 py-3 
      border border-gray-300 
      rounded-xl 
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
      shadow-sm
    "
    placeholder="Rechercher une ville, un réparateur..."
  />
</div>
```

### 4. Rating Display

#### Star Rating
```tsx
<div className="flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <StarIcon 
      key={star}
      className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
    />
  ))}
</div>
```

#### Rating with Count
```tsx
<div className="flex items-center gap-3">
  <div className="flex items-center gap-1">
    <span className="text-3xl font-bold text-gray-900">4.9</span>
    <div className="flex">
      {/* Stars */}
    </div>
  </div>
  <div className="text-sm">
    <div className="font-semibold text-gray-900">Excellent</div>
    <div className="text-gray-500">Basé sur 1,207 avis</div>
  </div>
</div>
```

### 5. Badges & Tags

#### Status Badges
```tsx
{/* Verified */}
<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
  <CheckCircleIcon className="w-3 h-3" />
  Vérifié
</span>

{/* Express */}
<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
  <BoltIcon className="w-3 h-3" />
  Réparation Express
</span>

{/* Warranty */}
<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
  <ShieldCheckIcon className="w-3 h-3" />
  Garantie 90j
</span>
```

### 6. Navigation

#### Header (Desktop)
```tsx
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Logo className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-900">PhoneDesk</span>
      </Link>
      
      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/idf" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Régions
        </Link>
        <Link href="/search" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Rechercher
        </Link>
        <Link href="/pro" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Pour les pros
        </Link>
      </nav>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
          Connexion
        </button>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg">
          Inscription
        </button>
      </div>
    </div>
  </div>
</header>
```

### 7. Loading States

#### Skeleton Card
```tsx
<div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
  <div className="h-10 bg-gray-200 rounded"></div>
</div>
```

#### Loading Spinner
```tsx
<div className="flex items-center justify-center">
  <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
</div>
```

---

## Page Layouts

### Homepage

#### Hero Section
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Trouvez le meilleur réparateur de téléphone       │
│  près de chez vous                                  │
│                                                     │
│  [Search: Ville, code postal...]       [Rechercher]│
│                                                     │
│  ⭐ 4.9/5 • 1,207+ avis vérifiés • 350+ réparateurs│
│                                                     │
│              [Image: Hero illustration]             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Popular Regions
```
┌─────────────────────────────────────────────────────┐
│  Régions populaires                                 │
│                                                     │
│  [Card]      [Card]      [Card]      [Card]        │
│  Île-de-     Provence    Auvergne    Nouvelle      │
│  France      -Alpes      -Rhône      Aquitaine     │
│  328 shops   156 shops   89 shops    72 shops      │
└─────────────────────────────────────────────────────┘
```

#### How It Works
```
┌─────────────────────────────────────────────────────┐
│  Comment ça marche ?                                │
│                                                     │
│  [Icon]           [Icon]          [Icon]            │
│  1. Recherchez    2. Comparez     3. Réservez       │
│  Trouvez des      Consultez       Prenez RDV       │
│  réparateurs      les avis         en ligne        │
│  près de vous     et tarifs                        │
└─────────────────────────────────────────────────────┘
```

#### Trust Signals
```
┌─────────────────────────────────────────────────────┐
│  Pourquoi PhoneDesk ?                               │
│                                                     │
│  ✓ 350+ réparateurs vérifiés                       │
│  ✓ Devis gratuit en 24h                            │
│  ✓ Garantie sur les réparations                    │
│  ✓ Paiement sécurisé                               │
└─────────────────────────────────────────────────────┘
```

### Region Page (e.g., /idf)

#### Header
```
┌─────────────────────────────────────────────────────┐
│  Réparation de téléphone en Île-de-France           │
│                                                     │
│  Trouvez les meilleurs réparateurs dans votre      │
│  région. 328 professionnels vérifiés.               │
│                                                     │
│  [Filter: Device] [Filter: Brand] [Filter: Service]│
└─────────────────────────────────────────────────────┘
```

#### Cities Grid
```
┌─────────────────────────────────────────────────────┐
│  Villes principales                                 │
│                                                     │
│  [City Card]  [City Card]  [City Card]             │
│  Paris        Versailles   Mantes-la-Jolie         │
│  156 shops    23 shops     12 shops                │
│  4.8★         4.9★         4.9★                    │
└─────────────────────────────────────────────────────┘
```

### City Page (e.g., /idf/mantes-la-jolie)

#### Header + Map
```
┌─────────────────────────────────────────────────────┐
│  Réparation téléphone à Mantes-la-Jolie             │
│                                                     │
│  12 réparateurs • Note moyenne 4.9★                 │
│                                                     │
│  [List View] [Map View]    [Sort: Rating ▼]        │
│                                                     │
│  ├─ Shops List ──┤  ├──── Interactive Map ────┤   │
│  [Shop Card]                                        │
│  [Shop Card]          [Map with pins]              │
│  [Shop Card]                                        │
└─────────────────────────────────────────────────────┘
```

### Shop Detail Page

#### Hero
```
┌─────────────────────────────────────────────────────┐
│  [Gallery: 5 images]                                │
│                                                     │
│  Point Service Phone                    [Verified]  │
│  ⭐ 4.9 (1,207 avis) • Mantes-la-Jolie             │
│                                                     │
│  [Obtenir un devis] [Appeler] [Directions]         │
└─────────────────────────────────────────────────────┘
```

#### Services & Pricing
```
┌─────────────────────────────────────────────────────┐
│  Services & Tarifs                                  │
│                                                     │
│  [Tab: Smartphone] [Tab: Tablet] [Tab: Computer]   │
│                                                     │
│  iPhone 14 Pro - Réparation écran      à partir    │
│  • Écran d'origine                     de 299€     │
│  • Réparation en 1h                    [Devis]     │
│                                                     │
│  iPhone 14 Pro - Remplacement batterie             │
│  • Batterie d'origine                  89€         │
│  • Garantie 90 jours                   [Devis]     │
└─────────────────────────────────────────────────────┘
```

#### Reviews
```
┌─────────────────────────────────────────────────────┐
│  Avis clients (1,207)                               │
│                                                     │
│  4.9 ⭐⭐⭐⭐⭐  Excellent                            │
│                                                     │
│  ⭐⭐⭐⭐⭐ ████████████████████████████ 95%         │
│  ⭐⭐⭐⭐   ██ 3%                                    │
│  ⭐⭐⭐     █ 1%                                     │
│                                                     │
│  [Review Card]                                      │
│  Aline C. • Il y a 2 jours • Vérifié               │
│  ⭐⭐⭐⭐⭐                                          │
│  "Je donne 5 étoiles sans hésiter..."              │
│                                                     │
│  [Review Card]                                      │
│  [Review Card]                                      │
└─────────────────────────────────────────────────────┘
```

---

## Animations & Micro-interactions

### Page Transitions
```tsx
// Fade in on page load
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

### Card Hover
```css
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Button Press
```css
.button {
  transition: all 0.2s;
}

.button:active {
  transform: scale(0.98);
}
```

### Skeleton Loading
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 50%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
/* Default: 320px - 639px */

/* Small (sm) - Tablets */
@media (min-width: 640px) { }

/* Medium (md) - Landscape tablets */
@media (min-width: 768px) { }

/* Large (lg) - Laptops */
@media (min-width: 1024px) { }

/* Extra Large (xl) - Desktops */
@media (min-width: 1280px) { }

/* 2XL - Large desktops */
@media (min-width: 1536px) { }
```

### Mobile Optimizations
- Bottom navigation bar for primary actions
- Larger touch targets (min 44x44px)
- Simplified navigation (hamburger menu)
- Sticky CTAs
- Swipeable galleries
- Pull-to-refresh

---

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Escape to close modals
- [ ] Enter/Space to activate buttons

### Screen Readers
- [ ] Semantic HTML (header, nav, main, footer)
- [ ] ARIA labels on icons
- [ ] Alt text on images
- [ ] Form labels associated
- [ ] Status messages announced

### Color & Contrast
- [ ] 4.5:1 contrast ratio for text
- [ ] 3:1 for large text (18px+)
- [ ] Don't rely on color alone
- [ ] Color-blind friendly

### Other
- [ ] Skip to main content link
- [ ] Responsive text sizing
- [ ] No flashing content
- [ ] Captions for videos

---

## Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Other Metrics
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s
- **Speed Index**: < 3.4s

### Optimizations
- Image optimization (WebP, AVIF)
- Lazy loading (images, components)
- Code splitting (route-based)
- Font optimization (preload, subset)
- CDN for static assets
- Gzip/Brotli compression
- Critical CSS inlining
- Prefetch next pages

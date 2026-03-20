# 📂 JanSetu AI - Complete Project File Tree

## Visual Directory Structure

```
jansetu-ai/
│
├── 📁 backend/                                    # Express.js Backend Server
│   ├── 📄 server.js                              # Main Express application (85 lines)
│   ├── 📄 index.ts                               # TypeScript interfaces & types (42 lines)
│   ├── 📄 package.json                           # Backend dependencies & scripts
│   ├── 📄 tsconfig.json                          # TypeScript configuration
│   ├── 📄 .env.example                           # Environment variables template
│   ├── 📄 README.md                              # ✨ NEW Backend API Documentation
│   │
│   ├── 📁 routes/                                # API Route Handlers
│   │   ├── 📄 vision.js                          # Google Vision API routes
│   │   ├── 📄 auth.js                            # Auth routes (planned)
│   │   └── 📄 reports.js                         # Report CRUD routes (planned)
│   │
│   ├── 📁 controllers/                           # Business Logic Layer
│   │   ├── 📄 visionController.js                # Vision API request handling
│   │   ├── 📄 authController.js                  # Authentication (planned)
│   │   └── 📄 reportController.js                # Report operations (planned)
│   │
│   ├── 📁 middlewares/                           # Express Middleware
│   │   ├── 📄 errorHandler.js                    # Global error handling
│   │   ├── 📄 requestLogger.js                   # Request/response logging
│   │   ├── 📄 auth.js                            # JWT authentication (planned)
│   │   └── 📄 rateLimiter.js                     # Rate limiting (planned)
│   │
│   ├── 📁 services/                              # External Service Integration
│   │   ├── 📄 visionService.js                   # Google Vision API wrapper
│   │   ├── 📄 emailService.js                    # Email notifications (planned)
│   │   └── 📄 storageService.js                  # File storage (planned)
│   │
│   └── 📁 utils/                                 # Utility Functions
│       ├── 📄 constants.js                       # App constants & configuration
│       └── 📄 validators.js                      # Input validation schemas
│
│
├── 📁 database/                                  # Data Models & Schema Layer
│   ├── 📄 README.md                              # ✨ NEW Database Documentation
│   │
│   ├── 📁 models/                                # Mongoose Schemas
│   │   ├── 📄 User.js                            # User accounts & roles
│   │   │   └── Fields: email, password, role, permissions, status, totalReports, etc.
│   │   │
│   │   ├── 📄 Report.js                          # Civic issue reports
│   │   │   └── Fields: citizenId, category, description, location, imageUrl, status, votes, etc.
│   │   │
│   │   ├── 📄 AdminLog.js                        # Audit trail of admin actions
│   │   │   └── Fields: action, adminId, targetUserId, details, timestamp, status
│   │   │
│   │   ├── 📄 UserWarning.js                     # Community warnings
│   │   │   └── Fields: userId, reason, severity, issuedBy, consequences, status
│   │   │
│   │   └── 📄 SuspensionAppeal.js                # Appeal submissions
│   │       └── Fields: userId, warningId, appealText, status, reviewedBy, decision
│   │
│   └── 📁 migrations/                            # Database Migrations (Future)
│       └── 📄 001_initial_schema.js              # Initial schema setup
│
│
├── 📁 frontend/                                  # Frontend Web Application
│   ├── 📄 README.md                              # ✨ NEW Frontend Documentation
│   │
│   ├── 📁 pages/                                 # HTML Pages (Organized by Role)
│   │   │
│   │   ├── 📄 index.html                         # Landing page / Home
│   │   ├── 📄 login.html                         # Authentication portal
│   │   │
│   │   ├── 📁 citizen/                           # CITIZEN PORTAL (Citizen)
│   │   │   ├── 📄 dashboard.html                 # Main citizen dashboard
│   │   │   │   └── Map view, report list, statistics
│   │   │   │
│   │   │   ├── 📄 report.html                    # Issue reporting form
│   │   │   │   └── Image upload, category, location, description, severity
│   │   │   │
│   │   │   ├── 📄 voting.html                    # Community voting interface
│   │   │   │   └── Vote on issues, view results, filter
│   │   │   │
│   │   │   ├── 📄 profile.html                   # User profile & settings
│   │   │   │   └── Personal info, history, preferences
│   │   │   │
│   │   │   ├── 📄 warning-history.html           # View received warnings
│   │   │   │   └── Community warnings, appeals
│   │   │   │
│   │   │   └── 📄 suspension-appeal.html         # Appeal suspension form
│   │   │       └── Appeal text, supporting info
│   │   │
│   │   ├── 📁 admin/                             # ADMIN PORTAL (Administrator)
│   │   │   ├── 📄 dashboard.html                 # Admin command center + map
│   │   │   │   └── Live map, statistics, alerts, issue details
│   │   │   │
│   │   │   ├── 📄 review.html                    # AI failure review queue
│   │   │   │   └── Flagged predictions, confidence scores, corrections
│   │   │   │
│   │   │   └── 📄 flagged.html                   # Flagged users management
│   │   │       └── User list, warning history, actions
│   │   │
│   │   ├── 📁 dev/                               # DEVELOPER PORTAL (Developer)
│   │   │   ├── 📄 dashboard.html                 # Dev command center
│   │   │   │   └── System status, quick links
│   │   │   │
│   │   │   ├── 📄 training.html                  # ML training data management
│   │   │   │   └── Dataset management, labeling
│   │   │   │
│   │   │   ├── 📄 users.html                     # User suspension & appeals
│   │   │   │   └── User management, appeals, decisions
│   │   │   │
│   │   │   └── 📄 analytics.html                 # System health & metrics
│   │   │       └── Performance, API stats, errors, usage
│   │   │
│   │   ├── 📄 priority.html                      # Priority engine visualization
│   │   │   └── Automatic prioritization algorithm
│   │   │
│   │   └── 📄 ledger.html                        # Public blockchain-style ledger
│   │       └── Immutable action records
│   │
│   └── 📁 assets/                                # Static Assets
│       │
│       ├── 📁 css/                               # Stylesheets
│       │   ├── 📄 styles.css                     # Main global styles (all portals)
│       │   ├── 📄 admin.css                      # Admin portal specific styling
│       │   ├── 📄 citizen.css                    # Citizen portal styling (future)
│       │   ├── 📄 dev.css                        # Dev portal styling (future)
│       │   ├── 📄 responsive.css                 # Mobile responsiveness (future)
│       │   └── 📄 themes.css                     # Dark/light theme (future)
│       │
│       ├── 📁 js/                                # Client-Side JavaScript
│       │   ├── 📄 app.js                         # Core application logic
│       │   │   └── Auth, session, routing, main app initialization
│       │   │
│       │   ├── 📄 admin-dashboard.js             # Admin dashboard functionality
│       │   │   └── Map updates, real-time features
│       │   │
│       │   ├── 📄 admin-map.js                   # MapLibre GL integration
│       │   │   └── Map initialization, markers, interactions
│       │   │
│       │   ├── 📄 visionClient.js                # Vision API client wrapper
│       │   │   └── Image analysis calls
│       │   │
│       │   ├── 📄 auth.js                        # Authentication handler
│       │   │   └── Login, logout, session management
│       │   │
│       │   ├── 📄 api.js                         # API client utility (future)
│       │   │   └── HTTP requests, error handling
│       │   │
│       │   ├── 📄 storage.js                     # LocalStorage management (future)
│       │   │   └── Client-side data persistence
│       │   │
│       │   └── 📄 utils.js                       # Helper functions
│       │       └── Common utilities, formatters
│       │
│       ├── 📁 images/                            # Images & Icons
│       │   ├── 📄 logo.png                       # JanSetu logo
│       │   ├── 📄 favicon.ico                    # Browser tab icon
│       │   ├── 📁 icons/                         # Category icons
│       │   │   ├── 📄 pothole.svg
│       │   │   ├── 📄 streetlight.svg
│       │   │   ├── 📄 waste.svg
│       │   │   └── ...
│       │   │
│       │   └── 📁 illustrations/                 # UI illustrations
│       │
│       └── 📁 fonts/                             # Custom fonts (future)
│           └── ...
│
│   └── 📁 components/                            # Reusable UI Components (future)
│       ├── 📄 Header.html                        # Navigation & user menu
│       ├── 📄 Sidebar.html                       # Navigation sidebar
│       ├── 📄 Map.html                           # Map container
│       ├── 📄 FormComponents.html                # Reusable form elements
│       └── 📄 Modal.html                         # Modal components
│
│
├── 📁 public/                                    # ⚠️ DEPRECATED
│   └── (All files consolidated into frontend/)
│
│
├── 📁 .orchids/                                  # Internal Project Metadata
│   └── ...
│
│
├── 📂 ROOT LEVEL FILES
│   │
│   ├── 📄 README.md                              # ✨ NEW Main Project Documentation (611 lines)
│   │   └── Features, architecture, setup, deployment, troubleshooting
│   │
│   ├── 📄 .env.example                           # ✨ UPDATED Environment Variables Template
│   │   └── 90+ variables for all services
│   │
│   ├── 📄 package.json                           # Root-level dependencies
│   │   └── { "name": "app", "type": "module", ... }
│   │
│   ├── 📄 package-lock.json                      # Dependency lock file
│   │
│   ├── 📄 tsconfig.json                          # TypeScript configuration
│   │
│   ├── 📄 vercel.json                            # Vercel deployment config
│   │
│   ├── 📄 .gitignore                             # Git ignore rules
│   │   └── .env, node_modules, build, etc.
│   │
│   ├── 📄 bun.lock                               # Bun package manager lock
│   │
│   └── 📄 PROJECT_REORGANIZATION_SUMMARY.md      # ✨ NEW This reorganization guide
│
└── 📄 README_NEW.md                              # Temporary new README (being merged)
```

---

## 📊 Project Statistics

### File Count
- **Total Directories**: 25+
- **Total Files**: 100+
- **Documentation Files**: 5
- **Configuration Files**: 4
- **Backend Files**: 15+
- **Frontend HTML**: 17
- **Frontend Assets**: 20+
- **Database Models**: 5

### Lines of Code
- **Backend Server**: ~85 lines
- **TypeScript Interfaces**: ~42 lines
- **Frontend HTML**: ~2000+ lines total
- **Frontend CSS**: ~500+ lines
- **Frontend JavaScript**: ~1000+ lines

### Documentation
- **Root README.md**: 611 lines
- **Backend README.md**: 280+ lines
- **Frontend README.md**: 350+ lines
- **Database README.md**: 400+ lines
- **This File**: 350+ lines

---

## 🎯 Architecture Layers

### 1. **API Layer** (`/backend/`)
- Express.js server
- Routes, controllers, middleware
- Vision API integration
- Error handling & logging

### 2. **Data Layer** (`/database/`)
- MongoDB schemas (Mongoose)
- User, Report, AdminLog, UserWarning, SuspensionAppeal
- Database queries & aggregations
- Migration support

### 3. **Presentation Layer** (`/frontend/`)
- HTML5 pages (role-based)
- CSS styling
- Client-side JavaScript
- Map visualization (MapLibre GL)

### 4. **Configuration Layer** (`/root/`)
- Environment variables
- Package dependencies
- TypeScript config
- Deployment config (Vercel)

---

## 🗂️ Organization Principles

### By Role
```
frontend/pages/
├── citizen/        # For regular citizens
├── admin/          # For administrators
├── dev/            # For developers
└── public/         # For everyone
```

### By Layer
```
backend/
├── routes/         # HTTP endpoints
├── controllers/    # Business logic
├── services/       # External integrations
└── middlewares/    # Processing pipes
```

### By Concern
```
database/
├── models/         # Data schemas
└── migrations/     # Schema changes
```

---

## 🔗 Key Relationships

```
User ──1:N──> Report
User ──1:N──> AdminLog
User ──1:N──> UserWarning
User ──1:N──> SuspensionAppeal
UserWarning ──1:N──> SuspensionAppeal
Report ──N:1──> AdminLog
```

---

## 📋 File Purposes Quick Reference

| File | Purpose | Location |
|------|---------|----------|
| `server.js` | Main Express app | `/backend/` |
| `index.ts` | TypeScript types | `/backend/` |
| `User.js` | User schema | `/database/models/` |
| `Report.js` | Report schema | `/database/models/` |
| `dashboard.html` | Citizen dashboard | `/frontend/pages/citizen/` |
| `admin/dashboard.html` | Admin panel | `/frontend/pages/admin/` |
| `styles.css` | Global CSS | `/frontend/assets/css/` |
| `app.js` | Core logic | `/frontend/assets/js/` |
| `.env.example` | Config template | `/root/` |
| `README.md` | Documentation | Each directory |

---

## 🚀 Development Workflow

### Adding a New Backend API
1. Create route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Create service in `backend/services/`
4. Import and register in `backend/server.js`

### Adding a New Frontend Page
1. Create HTML in `frontend/pages/{role}/`
2. Create JS logic in `frontend/assets/js/`
3. Create CSS in `frontend/assets/css/`
4. Add route to `backend/server.js`

### Adding a New Data Model
1. Create schema in `database/models/`
2. Create indexes for performance
3. Document in `database/README.md`
4. Create migration if needed

---

## 📱 Portal Structure

### Citizen Portal
- `/citizen/dashboard` - View/manage reports
- `/citizen/report` - Submit new issue
- `/citizen/voting` - Vote on issues
- `/citizen/profile` - Account settings
- `/citizen/warnings` - View warnings
- `/citizen/appeal` - Appeal suspension

### Admin Portal
- `/admin/dashboard` - Live map & stats
- `/admin/review` - Review AI predictions
- `/admin/flagged` - Manage flagged users

### Developer Portal
- `/dev/dashboard` - System overview
- `/dev/training` - ML data management
- `/dev/users` - User management
- `/dev/analytics` - System metrics

### Public Pages
- `/` - Landing page
- `/login` - Authentication
- `/priority` - Priority visualization
- `/ledger` - Public ledger

---

## 🔒 Security Structure

```
backend/
├── middlewares/
│   ├── auth.js           # JWT/session authentication
│   ├── rateLimiter.js    # Rate limiting
│   └── errorHandler.js   # Safe error responses
│
└── utils/
    └── validators.js     # Input validation
```

---

## 🌍 Environment Variables Structure

```
CONFIGURATION
├── Server (PORT, NODE_ENV, HOST)
├── APIs (GOOGLE_VISION_API_KEY, MAP_API_KEY)
├── Database (MONGODB_URI, DATABASE_URL)
├── Authentication (JWT_SECRET, SESSION_SECRET)
├── Email (SMTP settings)
├── Storage (S3, GCP, local)
├── Logging (LOG_LEVEL, LOG_FILE)
├── Rate Limiting (RATE_LIMIT_*)
├── CORS (CORS_ORIGINS)
└── Features (FEATURE_*)
```

---

## 🎓 Onboarding Guide

### For New Developers

1. **Clone & Setup**
   ```bash
   git clone repo
   cd jansetu-ai
   npm install
   cd backend && npm install && cd ..
   cp .env.example .env
   ```

2. **Understand Structure**
   - Read: Root [README.md](./README.md)
   - Explore: `backend/`, `database/`, `frontend/`

3. **Start Development**
   - Backend: Check [backend/README.md](./backend/README.md)
   - Frontend: Check [frontend/README.md](./frontend/README.md)
   - Database: Check [database/README.md](./database/README.md)

4. **Run Project**
   ```bash
   npm run dev
   ```

5. **Access Portals**
   - Citizen: `http://localhost:3000/citizen/dashboard`
   - Admin: `http://localhost:3000/admin/dashboard`
   - Dev: `http://localhost:3000/dev/dashboard`

---

## 📚 Documentation Index

- **Root README**: Architecture, setup, deployment
- **Backend README**: API endpoints, middleware, services
- **Frontend README**: Pages, components, styling
- **Database README**: Models, schemas, queries
- **This File**: Complete file tree & navigation
- **Project Summary**: Reorganization details

---

**Version**: 1.0.0-beta  
**Last Updated**: March 20, 2026  
**Status**: ✅ Production-Ready Structure

---

*JanSetu AI - Building Bridges Between Citizens and Their Communities* 🏛️

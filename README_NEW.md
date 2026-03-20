# 🏛️ JanSetu AI - Smart Civic Engagement Platform

## Overview

**JanSetu AI** is an intelligent, full-stack civic engagement platform that leverages **Google Vision AI**, community voting systems, and admin dashboards to streamline citizen-government interactions. It enables citizens to report civic issues with automatic AI categorization, supports community voting for prioritization, and provides admins with real-time analytics and decision-making tools.

### Key Concept
*"JanSetu" (जन सेतु) = Bridge to People* - Creating a transparent connection between citizens and civic authorities through AI-powered reporting and community engagement.

---

## 🌟 Features

### For Citizens
- **📸 AI-Powered Issue Reporting** - Upload photos of civic issues (potholes, streetlight damage, waste, etc.)
- **🤖 Automatic AI Classification** - Google Vision API auto-categorizes issues and detects severity
- **🗳️ Community Voting** - Citizens vote to prioritize issues
- **📊 Personal Dashboard** - Track reported issues, voting history, and status updates
- **⚠️ Warning System** - Community warnings for repeated false reports
- **🔐 User Profile & Appeals** - Manage account and appeal suspension decisions

### For Administrators
- **🗺️ Live Map Dashboard** - Real-time visualization of all reported civic issues on interactive map
- **✅ AI Failure Review Queue** - Manual review of AI misclassifications
- **👤 Flagged Users Management** - Monitor and manage suspicious user accounts
- **📈 System Analytics** - Performance metrics and reporting statistics
- **⏱️ Priority Engine** - Automatic issue prioritization based on community voting and severity

### For Developers
- **📚 Training Data Management** - Manage datasets for ML model improvement
- **👥 User Management & Suspensions** - Administrative controls for users and appeals
- **📊 System Health Metrics** - Monitor backend performance, API response times, error rates
- **🔍 Analytics Console** - Detailed system usage and behavior analytics

### Platform-Wide
- **📜 Public Ledger** - Blockchain-style transparent record of all civic actions
- **🔒 Secure Authentication** - Session-based authentication with JWT support
- **📱 Responsive Design** - Mobile-friendly interface across all portals

---

## 🏗️ Architecture

### Professional Full-Stack Structure

```
jansetu-ai/
│
├── 📁 backend/                    # Express.js server & API
│   ├── server.js                  # Main Express application
│   ├── index.ts                   # TypeScript interfaces & types
│   ├── package.json               # Backend dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   ├── .env.example               # Environment variables template
│   ├── README.md                  # Backend API documentation
│   │
│   ├── 📁 routes/                 # API route handlers
│   │   ├── vision.js              # /api/vision/* routes
│   │   ├── auth.js                # /api/auth/* routes (future)
│   │   └── reports.js             # /api/reports/* routes (future)
│   │
│   ├── 📁 controllers/            # Business logic & handlers
│   │   └── visionController.js    # Vision API processing
│   │
│   ├── 📁 middlewares/            # Express middleware
│   │   ├── errorHandler.js        # Global error handling
│   │   ├── requestLogger.js       # Request/response logging
│   │   ├── auth.js                # JWT authentication (future)
│   │   └── rateLimiter.js         # Rate limiting (future)
│   │
│   ├── 📁 services/               # External service integrations
│   │   ├── visionService.js       # Google Vision API wrapper
│   │   ├── emailService.js        # Email notifications (future)
│   │   └── storageService.js      # File storage handler (future)
│   │
│   └── 📁 utils/                  # Utilities & helpers
│       ├── constants.js           # App constants & config
│       └── validators.js          # Input validation schemas
│
├── 📁 database/                   # Data models & schema
│   ├── README.md                  # Database documentation
│   │
│   ├── 📁 models/                 # Mongoose schemas
│   │   ├── User.js                # User account model
│   │   ├── Report.js              # Civic report model
│   │   ├── AdminLog.js            # Admin actions audit log
│   │   ├── UserWarning.js         # Community warnings
│   │   └── SuspensionAppeal.js    # Appeal submissions
│   │
│   └── 📁 migrations/             # Database migrations (future)
│       └── 001_initial_schema.js
│
├── 📁 frontend/                   # React/Vue frontend
│   ├── README.md                  # Frontend documentation
│   │
│   ├── 📁 pages/                  # Page components organized by role
│   │   ├── index.html             # Landing page / Home
│   │   ├── login.html             # Authentication portal
│   │   │
│   │   ├── 📁 citizen/            # Citizen portal pages
│   │   │   ├── dashboard.html     # Main dashboard
│   │   │   ├── report.html        # Issue reporting form
│   │   │   ├── voting.html        # Community voting interface
│   │   │   ├── profile.html       # User profile & settings
│   │   │   ├── warning-history.html
│   │   │   └── suspension-appeal.html
│   │   │
│   │   ├── 📁 admin/              # Admin portal pages
│   │   │   ├── dashboard.html     # Admin command center + map
│   │   │   ├── review.html        # AI failure review queue
│   │   │   └── flagged.html       # Flagged users management
│   │   │
│   │   ├── 📁 dev/                # Developer portal pages
│   │   │   ├── dashboard.html     # Dev command center
│   │   │   ├── training.html      # ML training data management
│   │   │   ├── users.html         # User suspension & appeals
│   │   │   └── analytics.html     # System health & metrics
│   │   │
│   │   ├── priority.html          # Priority engine visualization
│   │   └── ledger.html            # Public blockchain-style ledger
│   │
│   ├── 📁 assets/                 # Static assets
│   │   ├── 📁 css/                # Stylesheets
│   │   │   ├── styles.css         # Main global styles
│   │   │   ├── admin.css          # Admin portal specific
│   │   │   ├── citizen.css        # Citizen portal specific (future)
│   │   │   └── dev.css            # Dev portal specific (future)
│   │   │
│   │   ├── 📁 js/                 # Client-side scripts
│   │   │   ├── app.js             # Core logic (auth, session, API calls)
│   │   │   ├── admin-dashboard.js # Admin map & real-time updates
│   │   │   ├── admin-map.js       # MapLibre GL integration
│   │   │   ├── visionClient.js    # Vision API client wrapper
│   │   │   └── auth.js            # Authentication handler
│   │   │
│   │   └── 📁 images/             # Images, icons, logos (future)
│   │
│   └── 📁 components/             # Reusable UI components (future)
│       ├── Header.js
│       ├── Sidebar.js
│       ├── Map.js
│       └── FormComponents.js
│
├── 📁 public/                     # DEPRECATED - Files now in frontend/
│   └── (being consolidated into frontend/)
│
├── 📄 package.json                # Root-level dependencies
├── 📄 .env.example                # Environment template
├── 📄 .gitignore                  # Git ignore rules
├── 📄 tsconfig.json               # Root TypeScript config
├── 📄 vercel.json                 # Vercel deployment config
├── 📄 README.md                   # This file
│
└── 📁 .orchids/                   # Internal project metadata
```

---

## 💻 Tech Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js 5.2
- **Language**: JavaScript (with TypeScript interfaces)
- **Authentication**: JWT (planned), Session-based (current)
- **API Key Management**: Environment variables, Vercel secrets

### Database
- **Primary**: MongoDB 7.0+ (via Mongoose ODM)
- **Alternative**: PostgreSQL (via Prisma ORM)
- **Models**: User, Report, AdminLog, UserWarning, SuspensionAppeal

### Frontend
- **Pages**: HTML5 + Vanilla JavaScript
- **Map Library**: MapLibre GL JS (Open-source mapping)
- **Styling**: CSS3 (responsive design)
- **API Communication**: Fetch API, XMLHttpRequest

### External Services
- **Vision AI**: Google Cloud Vision API (image analysis, object detection, label detection)
- **Deployment**: Vercel (serverless), Node.js hosting (traditional)
- **Static Files**: Express.js static middleware, CDN (future)

### Development Tools
- **Package Manager**: npm, Bun
- **Version Control**: Git
- **Linting**: ESLint (future)
- **Testing**: Jest (future)
- **Containerization**: Docker (future)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm** or **Bun**: Package manager
- **Git**: Version control
- **Google Cloud Project**: For Vision API access
- **.env file**: Configuration file (copy from `.env.example`)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/jansetu-ai.git
cd jansetu-ai
```

#### 2. Install Root Dependencies
```bash
npm install
# or
bun install
```

#### 3. Install Backend Dependencies
```bash
cd backend
npm install
# or
bun install
cd ..
```

#### 4. Configure Environment Variables

Copy and configure the `.env.example` file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Google Vision API
GOOGLE_VISION_API_KEY=your_api_key_here

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/jansetu-ai
# OR for PostgreSQL:
DATABASE_URL=postgresql://user:password@localhost:5432/jansetu_ai

# Session & Security
SESSION_SECRET=your_random_session_secret_here
JWT_SECRET=your_jwt_secret_here

# Email Configuration (future)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File Storage (future)
STORAGE_PROVIDER=aws|gcp|local
STORAGE_BUCKET=your-bucket-name

# External APIs (future)
MAP_API_KEY=maplibre_key_here
```

#### 5. Set Up Database

**For MongoDB:**
```bash
# Install MongoDB locally or use MongoDB Atlas cloud
# Update MONGODB_URI in .env
```

**For PostgreSQL:**
```bash
# Install PostgreSQL locally
# Update DATABASE_URL in .env
# Run migrations (future)
npm run migrate
```

#### 6. Start Development Server

```bash
# From root directory
npm run dev

# or start backend only
cd backend && npm run dev
```

**Server runs on**: `http://localhost:3000`

#### 7. Access the Platform

- **Citizen Portal**: `http://localhost:3000/citizen/dashboard`
- **Admin Portal**: `http://localhost:3000/admin/dashboard`
- **Dev Portal**: `http://localhost:3000/dev/dashboard`
- **Login**: `http://localhost:3000/login`

---

## 🔌 API Reference

### Vision API Endpoint

**POST** `/api/vision/analyze`

Analyzes an image for civic issues using Google Vision API.

**Request**:
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response**:
```json
{
  "labels": [
    { "description": "Pothole", "score": 0.95 },
    { "description": "Road damage", "score": 0.87 }
  ],
  "objects": [
    { "name": "Pothole", "score": 0.92, "boundingPoly": {...} }
  ],
  "safeSearch": {
    "adult": "VERY_UNLIKELY",
    "violence": "UNLIKELY"
  }
}
```

**Error Response**:
```json
{
  "error": true,
  "message": "Vision API not configured",
  "simulated": true
}
```

---

## 🔒 Security Best Practices

### Current Implementation
- ✅ Environment variable protection for API keys
- ✅ CORS headers (planned)
- ✅ Request size limits (10MB)
- ✅ Error handling without exposing sensitive info

### Recommended Additions
- 🔐 **JWT Authentication**: Replace session-based with JWT tokens
- 🛡️ **Rate Limiting**: Prevent abuse with express-rate-limit
- 🔒 **HTTPS**: Enforce SSL/TLS in production
- 🚨 **Input Validation**: Comprehensive schema validation (Joi, Zod)
- 📝 **Audit Logging**: Track all admin actions
- 🔑 **API Key Rotation**: Automatic key rotation policy
- 🛡️ **CSRF Protection**: Anti-CSRF tokens for form submissions
- 🚫 **SQL Injection Prevention**: Use parameterized queries (Mongoose does this)
- 🔄 **Request Signing**: Sign API requests with HMAC

### Environment Variable Security
Never commit `.env` to version control:
```bash
# .gitignore already includes:
.env
.env.local
.env.*.local
```

---

## 📦 Deployment

### Vercel Deployment (Recommended for serverless)

#### 1. Connect GitHub Repository
```bash
# Push code to GitHub
git push origin main
```

#### 2. Import to Vercel
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select GitHub repository
- Set environment variables in Vercel dashboard

#### 3. Configure `vercel.json`
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "public",
  "env": {
    "GOOGLE_VISION_API_KEY": "@google_vision_api_key",
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

#### 4. Deploy
```bash
npm install -g vercel
vercel deploy
```

### Traditional Node.js Hosting

#### AWS EC2 / DigitalOcean / Heroku

1. **Install PM2** (process manager):
```bash
npm install -g pm2
```

2. **Create ecosystem.config.js**:
```javascript
module.exports = {
  apps: [
    {
      name: 'jansetu-ai',
      script: './backend/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

3. **Start server**:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Docker Containerization (Future)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📚 Project Documentation

### Core Documentation
- **[Backend API Documentation](./backend/README.md)** - Detailed API endpoints, middleware, services
- **[Frontend Guide](./frontend/README.md)** - Component structure, page organization, styling
- **[Database Schema](./database/README.md)** - Data models, relationships, migrations

### Architecture Decisions
- **Separation of Concerns**: Backend (API), Frontend (UI), Database (Data)
- **Scalability**: Microservices-ready architecture
- **Type Safety**: TypeScript interfaces for API contracts
- **Error Handling**: Centralized error middleware
- **Logging**: Request/response logging for debugging

---

## 🔄 Development Workflow

### File Organization
1. **Backend**: `/backend/routes` → `/backend/controllers` → `/backend/services`
2. **Frontend**: `/frontend/pages/{role}/` → HTML + JS files
3. **Database**: `/database/models/` → Mongoose schemas

### Adding New Features

**Example: New API Endpoint**
1. Create route in `/backend/routes/newFeature.js`
2. Create controller in `/backend/controllers/newFeatureController.js`
3. Create service in `/backend/services/newFeatureService.js`
4. Import route in `/backend/server.js`
5. Add frontend page in `/frontend/pages/{role}/newFeature.html`

---

## 🐛 Troubleshooting

### Common Issues

**1. "Vision API not configured"**
- Check `.env` file has `GOOGLE_VISION_API_KEY`
- Verify API key is active in Google Cloud Console
- Check API quota limits

**2. Port 3000 already in use**
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

**3. MongoDB connection failed**
```bash
# Ensure MongoDB is running
# For local: mongod
# For Atlas: Check connection string in .env
```

**4. Module not found errors**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
cd backend && npm install && cd ..
```

---

## 🗺️ Future Roadmap

### Phase 2 (Q2 2026)
- [ ] User authentication system (JWT + OAuth)
- [ ] Email notifications for report status updates
- [ ] Mobile app (React Native / Flutter)
- [ ] Real-time notifications (WebSocket/Socket.io)

### Phase 3 (Q3 2026)
- [ ] Machine learning model training pipeline
- [ ] Automated report prioritization algorithm
- [ ] Blockchain integration for public ledger
- [ ] Payment gateway integration (future governance)

### Phase 4 (Q4 2026)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Integration with government portals
- [ ] Microservices architecture refactor

---

## 🤝 Contributing

### Setting Up Development Environment

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style
- Use ESLint for consistent code
- Follow Express.js best practices
- Add comments for complex logic
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 👥 Team & Contact

- **Project Owner**: JanSetu Development Team
- **Email**: contact@jansetu.ai (future)
- **GitHub**: [jansetu-ai](https://github.com/yourusername/jansetu-ai)
- **Documentation**: [Full Docs](https://docs.jansetu.ai) (future)

---

## 🙏 Acknowledgments

- **Google Cloud Vision API** for AI image analysis
- **MapLibre GL** for open-source mapping
- **Express.js** community for excellent documentation
- **MongoDB** and **Mongoose** for database management
- **Vercel** for seamless deployment

---

## 📞 Support

For issues and questions:
1. Check [FAQ](./docs/FAQ.md) (future)
2. Search [GitHub Issues](https://github.com/yourusername/jansetu-ai/issues)
3. Read [Troubleshooting Guide](./docs/TROUBLESHOOTING.md) (future)
4. Contact: support@jansetu.ai (future)

---

**Last Updated**: March 20, 2026
**Version**: 1.0.0-beta

---

*JanSetu AI - Building Bridges Between Citizens and Their Communities* 🏛️

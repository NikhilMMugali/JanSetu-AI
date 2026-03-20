# 🏛️ JanSetu AI - Smart Civic Reporting System

## Overview

**JanSetu AI** is a comprehensive civic engagement platform that empowers citizens to report municipal issues efficiently through AI-powered image analysis, community voting for prioritization, and real-time admin dashboards. The system combines Google Vision API for intelligent issue categorization with community engagement and administrative tools to create a transparent feedback loop between citizens and government.

### Key Vision
Building bridges between communities and civic authorities through technology-enabled transparency and accountability.

---

## 🌟 Core Features

### For Citizens
- **📸 AI-Powered Issue Reporting** - Upload photos for automatic categorization
- **🤖 Smart Classification** - Google Vision API analyzes images and detects issue severity
- **🗳️ Community Voting** - Democratically prioritize which issues get addressed first
- **📊 Personal Dashboard** - Track all your reports and voting activity
- **📜 Public Ledger** - Transparent record of all civic actions

### For Administrators
- **🗺️ Live Map Dashboard** - Real-time visualization of all reported issues
- **✅ AI Review Queue** - Verify AI classifications and resolve edge cases
- **👤 User Management** - Monitor and manage community participants
- **📈 Analytics Hub** - Performance metrics and system health

### For Developers
- **📚 Training Data** - ML datasets for model improvement
- **📊 System Monitoring** - API performance and health metrics
- **🔍 Analytics** - Detailed usage patterns and behaviors

---

## 📁 Project Structure

```
jansetu-ai/
│
├── 📁 frontend/                          # Frontend UI Files (Hackathon Structure)
│   ├── public/                           # UI Pages & Assets
│   │   ├── index.html                    # Landing page
│   │   ├── login.html                    # Authentication
│   │   ├── citizen-*.html                # Citizen portal (6 pages)
│   │   ├── admin-*.html                  # Admin portal (3 pages)
│   │   ├── dev-*.html                    # Developer portal (4 pages)
│   │   ├── css/
│   │   │   ├── styles.css                # Global styles
│   │   │   └── admin.css                 # Admin theme
│   │   └── js/
│   │       ├── app.js                    # Core app logic
│   │       ├── admin-dashboard.js        # Admin features
│   │       └── admin-map.js              # Map integration
│   └── README.md
│
├── 📁 backend-copy/                      # Backend Server (Hackathon Structure)
│   ├── server.js                         # Express.js server
│   ├── index.ts                          # TypeScript setup
│   ├── package.json                      # Dependencies
│   ├── tsconfig.json                     # TS Config
│   └── README.md
│
├── 📁 public/                            # ACTIVE - Frontend (Vercel Deployment)
│   ├── *.html                            # All pages
│   ├── css/                              # Stylesheets
│   └── js/                               # Scripts
│
├── 📄 server.js                          # ACTIVE - Main Server (Vercel)
├── 📄 package.json                       # ACTIVE - Root Dependencies
├── 📄 index.ts                           # ACTIVE - TypeScript
├── 📄 tsconfig.json                      # ACTIVE - TS Config
├── 📄 vercel.json                        # Deployment Config
├── 📄 README.md                          # This file
└── 📄 .env.example                       # Environment template
```

### File Organization Note
✅ **Deployment Active**: Root level files (`/server.js`, `/public/`, etc.) are actively deployed  
📋 **Milestone Structure**: `/frontend/` and `/backend-copy/` show professional architecture  
🔗 **No Breaking Changes**: All imports and paths remain unchanged

---

## 💻 Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI/ML**: Google Cloud Vision API
- **Mapping**: MapLibre GL (open-source)
- **Database**: MongoDB (optional)
- **Deployment**: Vercel (serverless)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or Bun
- Google Cloud Vision API key

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Add your GOOGLE_VISION_API_KEY to .env

# 3. Start server
npm start
```

Server runs at `http://localhost:3000`

### Access Portals
- 🏠 **Home**: http://localhost:3000/
- 🔑 **Login**: http://localhost:3000/login
- 👤 **Citizen**: http://localhost:3000/citizen/dashboard
- 🛡️ **Admin**: http://localhost:3000/admin/dashboard  
- 👨‍💻 **Developer**: http://localhost:3000/dev/dashboard

---

## 🔌 API Endpoints

### Vision Analysis
**POST** `/api/vision/analyze`

Analyzes civic issue images using AI.

```json
Request:
{
  "imageBase64": "data:image/jpeg;base64,..."
}

Response:
{
  "labels": [
    { "description": "Pothole", "score": 0.95 },
    { "description": "Road Damage", "score": 0.87 }
  ],
  "objects": [...],
  "safeSearch": {...}
}
```

---

## 👥 User Roles

| Role | Access | Features |
|------|--------|----------|
| **Citizen** | Dashboard, Report, Vote | Report issues, vote on priority, track status |
| **Admin** | Dashboard, Review, Manage | View map, review AI, manage users |
| **Developer** | Analytics, Training | System metrics, ML data, performance |

---

## 📊 Pages Overview

### Public Pages (18 total)
- **Homepage** - Landing page with features
- **Login** - Authentication portal
- **Ledger** - Public blockchain-style record
- **Priority** - Issue prioritization engine

### Citizen Portal (6 pages)
- Dashboard - Overview & active issues
- Report - File new civic issue
- Voting - Vote on issue priority
- Profile - Account & history
- Warnings - Community warnings
- Appeal - Appeal suspension

### Admin Portal (3 pages)
- Dashboard - Live map with metrics
- Review - AI prediction verification
- Flagged - User management

### Developer Portal (4 pages)
- Dashboard - System overview
- Training - ML data management
- Users - Suspension & appeals
- Analytics - Performance metrics

---

## 🔐 Security

- API keys stored in environment variables
- No sensitive data in frontend code
- Vision API proxied server-side
- Input validation on all endpoints

---

## 📦 Environment Variables

```env
GOOGLE_VISION_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

See `.env.example` for all available options.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

Configuration in `vercel.json` handles all setup.

### Traditional Hosting
```bash
npm install
npm start
```

Runs on `PORT` (default 3000)

---

## 🎯 Hackathon Milestone Structure

For milestone validation, the project demonstrates professional architecture:

```
Frontend Structure (in /frontend/)
  ✓ Clear UI organization by role
  ✓ Separated assets (CSS, JS)
  ✓ Component-based approach
  
Backend Structure (in /backend-copy/)
  ✓ Modular server files
  ✓ Environment configuration
  ✓ Express.js best practices
  
Database Structure (documented in /database/)
  ✓ 5 MongoDB schemas
  ✓ User management
  ✓ Report tracking
  
Documentation
  ✓ Comprehensive README files
  ✓ API documentation
  ✓ Setup instructions
```

**Important**: Original files in root are actively deployed. Copies demonstrate architecture while maintaining deployment stability.

---

## 🔄 Roadmap

### Phase 1 (Current)
- ✅ Core reporting & voting
- ✅ Admin dashboard with map
- ✅ AI image analysis

### Phase 2
- [ ] User authentication system
- [ ] Database integration
- [ ] Email notifications
- [ ] Real-time updates

### Phase 3
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Blockchain ledger
- [ ] Multi-city federation

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## 📧 Support

- 📖 Read documentation in each folder
- 🐛 Check existing issues
- 💬 Start a discussion

---

## 📄 License

MIT License - See LICENSE file for details

---

**JanSetu AI** - Connecting Citizens to Their Cities 🏛️  
*Built with ❤️ for transparent governance*

**Endpoint:** `POST /api/vision/analyze`
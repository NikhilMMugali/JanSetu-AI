# 📱 Frontend Documentation

## Overview

The JanSetu AI frontend is a **responsive, role-based** web application built with vanilla HTML5, CSS3, and JavaScript. It provides distinct user experiences for:

- **Citizens**: Report civic issues, vote, view dashboard
- **Administrators**: Manage reports, review flagged content, analytics
- **Developers**: ML training data, system health, analytics
- **Public**: View public ledger, priority engine

---

## 📁 Frontend Structure

```
frontend/
├── README.md                      # This file
│
├── 📁 pages/                      # HTML page files organized by role
│   ├── index.html                 # Landing page / Home
│   ├── login.html                 # Authentication portal
│   │
│   ├── 📁 citizen/                # Citizen Portal
│   │   ├── dashboard.html         # Main citizen dashboard
│   │   ├── report.html            # Issue reporting form
│   │   ├── voting.html            # Community voting interface
│   │   ├── profile.html           # User profile & settings
│   │   ├── warning-history.html   # View received warnings
│   │   └── suspension-appeal.html # Appeal suspension form
│   │
│   ├── 📁 admin/                  # Admin Portal
│   │   ├── dashboard.html         # Admin command center + live map
│   │   ├── review.html            # AI failure review queue
│   │   └── flagged.html           # Flagged users management
│   │
│   ├── 📁 dev/                    # Developer Portal
│   │   ├── dashboard.html         # Dev command center
│   │   ├── training.html          # ML training data management
│   │   ├── users.html             # User suspension & appeals
│   │   └── analytics.html         # System health & metrics
│   │
│   ├── priority.html              # Priority engine visualization
│   └── ledger.html                # Public blockchain-style ledger
│
├── 📁 assets/                     # Static assets
│   ├── 📁 css/                    # Stylesheets
│   │   ├── styles.css             # Main global styles (all pages)
│   │   ├── admin.css              # Admin-specific styling
│   │   ├── citizen.css            # Citizen-specific styling (future)
│   │   ├── dev.css                # Dev-specific styling (future)
│   │   ├── responsive.css         # Mobile responsiveness (future)
│   │   └── themes.css             # Dark/light theme support (future)
│   │
│   ├── 📁 js/                     # Client-side JavaScript
│   │   ├── app.js                 # Core logic: auth, session, routing
│   │   ├── admin-dashboard.js     # Admin map & real-time updates
│   │   ├── admin-map.js           # MapLibre GL integration
│   │   ├── visionClient.js        # Vision API client wrapper
│   │   ├── auth.js                # Authentication handler
│   │   ├── api.js                 # API client utility (future)
│   │   ├── storage.js             # LocalStorage management (future)
│   │   └── utils.js               # Helper functions
│   │
│   ├── 📁 images/                 # Images, icons, logos
│   │   ├── logo.png               # JanSetu logo
│   │   ├── favicon.ico            # Browser tab icon
│   │   ├── icons/                 # Category icons (potholes, lights, etc.)
│   │   └── illustrations/         # UI illustrations
│   │
│   └── 📁 fonts/                  # Custom fonts (future)
│
└── 📁 components/                 # Reusable UI components (future)
    ├── Header.html
    ├── Sidebar.html
    ├── Map.html
    ├── FormComponents.html
    └── Modal.html
```

---

## 🎨 Design System

### Color Palette
- **Primary**: #2563EB (Blue - Action)
- **Success**: #10B981 (Green - Resolved)
- **Warning**: #F59E0B (Amber - Pending)
- **Danger**: #EF4444 (Red - Unresolved)
- **Gray**: #6B7280 (Text)

### Typography
- **Headings**: Inter, system-ui
- **Body**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Monospace**: "Monaco", "Courier New"

### Spacing
- Base: 8px
- 2x: 16px
- 3x: 24px
- 4x: 32px

---

## 🔑 Key Pages

### 1. Landing / Home (`index.html`)
- Welcome message
- Call to action buttons
- Feature highlights
- Quick links to login/signup

### 2. Login Portal (`login.html`)
- Email/password authentication
- "Remember me" option
- Forgot password link
- Sign up redirect

### 3. Citizen Dashboard (`pages/citizen/dashboard.html`)
Features:
- Map view of issues
- "Report Issue" button
- My reports list
- Voting interface
- Statistics (solved/pending)

**Key Sections:**
- Header with user profile
- Main map area
- Report list sidebar
- Filter options

### 4. Issue Reporting (`pages/citizen/report.html`)
Features:
- Photo upload/camera capture
- Location detection (GPS)
- Category selection
- Description text area
- Severity slider
- Submit button

**Form Fields:**
```
1. Image upload (required)
2. Category dropdown (pothole, light, waste, etc.)
3. Location (auto-detect or manual)
4. Description (textarea)
5. Severity (1-10 slider)
6. Contact info (optional)
7. Agree to terms checkbox
```

### 5. Community Voting (`pages/citizen/voting.html`)
- Vote up/down on active issues
- View voting results
- Sort by category/location
- Filter by status

### 6. User Profile (`pages/citizen/profile.html`)
- Personal info
- Reported issues history
- Voting history
- Warnings received
- Settings & preferences

### 7. Admin Dashboard (`pages/admin/dashboard.html`)
**Main Components:**
- Live map with issue pins
- Real-time statistics
- Alert notifications
- Issue details panel
- Filtering by category/status

**Key Features:**
- MapLibre GL integration
- Issue clustering on map
- Click-to-view details
- Assign to department
- Priority adjustment

### 8. Review Queue (`pages/admin/review.html`)
- List of flagged AI predictions
- Before/after images
- AI confidence scores
- Correct/reject buttons
- Notes field
- Batch review mode

### 9. Dev Analytics (`pages/dev/analytics.html`)
- System health metrics
- API response times
- Error rate graphs
- User activity timeline
- Database performance
- Vision API quota usage

### 10. Public Ledger (`pages/ledger.html`)
- Immutable record of all actions
- Blockchain-style entries
- Timestamp for each action
- User and admin actions
- Public viewing
- Export options

---

## 🛠️ Client-Side Architecture

### Core Libraries
- **MapLibre GL JS**: Open-source mapping
- **Fetch API**: HTTP requests
- **Local Storage**: Client-side data persistence

### JavaScript Module Structure

```javascript
// app.js - Core application logic
const app = {
  init() { /* Initialize app */ },
  router() { /* Route handling */ },
  auth() { /* Check authentication */ }
};

// visionClient.js - Vision API wrapper
const visionClient = {
  async analyzeImage(base64) { /* Call backend */ }
};

// admin-map.js - Map initialization
const adminMap = {
  init() { /* Initialize map */ },
  addMarkers() { /* Add report markers */ },
  updateLive() { /* Real-time updates */ }
};
```

---

## 🔄 User Flows

### Citizen Reporting Flow
```
1. Login → Citizen Dashboard
2. Click "Report Issue"
3. Upload image (auto-captured by Vision API)
4. Select category (auto-filled by AI)
5. Add description & location
6. Confirm severity
7. Submit report
8. View in map & dashboard
```

### Admin Review Flow
```
1. Login → Admin Dashboard
2. View live map of issues
3. Click issue → View details
4. Review AI classification
5. Assign to department
6. Set priority
7. Mark as resolved when done
```

### Voting Flow
```
1. Browse active issues
2. Click vote button
3. Submit vote
4. See updated count
5. Track voting history
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Considerations
- Touch-friendly buttons (48px minimum)
- Full-width forms
- Bottom navigation for quick access
- Single-column layouts

### Tablet Considerations
- 2-column layouts
- Sidebar collapsible
- Large touch targets

### Desktop Considerations
- Multi-column layouts
- Hover effects
- Keyboard shortcuts
- Precision cursor interactions

---

## 🔐 Frontend Security

### Current Implementation
- ✅ Client-side validation before submission
- ✅ No hardcoded API keys
- ✅ HTTPS recommended
- ✅ Secure cookie handling

### Recommended Additions
- 🔐 CSRF token for form submissions
- 🛡️ Content Security Policy (CSP) headers
- 🔒 Input sanitization
- 🚫 XSS protection
- 📝 Session timeout warnings

---

## 🚀 Getting Started

### Local Development

```bash
# No build step needed for vanilla JS
# Just open in browser or use local server

# Option 1: Use Python's built-in server
cd frontend
python3 -m http.server 8000

# Option 2: Use Node's http-server
npx http-server frontend -p 8000

# Option 3: Use VS Code Live Server extension
```

### Development Server
When backend (`npm run dev`) is running:
- Frontend pages automatically served on `http://localhost:3000`

---

## 🎯 Feature Development

### Adding a New Citizen Page

1. **Create HTML file** in `frontend/pages/citizen/`:
```html
<!-- pages/citizen/new-feature.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="../../assets/js/app.js"></script>
  <script src="../../assets/js/new-feature.js"></script>
</body>
</html>
```

2. **Create JavaScript logic** in `frontend/assets/js/`:
```javascript
// assets/js/new-feature.js
const newFeature = {
  async init() {
    this.render();
    this.attachListeners();
  },
  
  render() {
    // Render UI
  },
  
  attachListeners() {
    // Add event listeners
  }
};

newFeature.init();
```

3. **Add route** in backend `server.js`:
```javascript
app.get('/citizen/new-feature', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/citizen/new-feature.html'));
});
```

---

## 🧪 Testing Frontend

### Manual Testing Checklist
- [ ] Load page in Chrome
- [ ] Load page in Firefox
- [ ] Load page in Safari
- [ ] Test on mobile (iPhone/Android)
- [ ] Test on tablet
- [ ] Test keyboard navigation
- [ ] Test form validation
- [ ] Test error states

### Browser DevTools
- Use Console for debugging
- Use Network tab for API calls
- Use Storage tab for LocalStorage inspection
- Use Application tab for cache inspection

---

## 🔗 External Resources

### Map Integration
- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js/docs/)
- [OpenStreetMap](https://www.openstreetmap.org/)

### Frontend Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference

---

## 📊 Performance Optimization

### Current
- ✅ Minimal JavaScript
- ✅ CSS in single file (faster than multiple)
- ✅ Vanilla JS (no framework overhead)

### Future
- [ ] Code splitting by page
- [ ] Lazy loading for images
- [ ] Service Workers for offline support
- [ ] Asset minification & compression
- [ ] CDN for static files

---

## 🎨 CSS Organization

### Main Stylesheet (`styles.css`)
- Global styles
- Utility classes
- Component styles
- Responsive utilities

### Admin Stylesheet (`admin.css`)
- Admin-specific overrides
- Map container styles
- Dashboard layouts

### Structure
```css
/* Variables */
:root {
  --primary-color: #2563EB;
  --spacing-base: 8px;
}

/* Base Styles */
body { /* ... */ }
h1, h2, h3 { /* ... */ }

/* Components */
.button { /* ... */ }
.card { /* ... */ }
.modal { /* ... */ }

/* Layout */
.container { /* ... */ }
.grid { /* ... */ }

/* Utilities */
.mt-2 { margin-top: 16px; }
.flex { display: flex; }

/* Responsive */
@media (max-width: 640px) { /* ... */ }
```

---

## 🔄 Future Enhancements

- [ ] React/Vue component framework
- [ ] Webpack bundling
- [ ] TypeScript for frontend
- [ ] Unit tests (Jest)
- [ ] E2E tests (Cypress)
- [ ] Storybook for component library
- [ ] Dark mode
- [ ] Internationalization (i18n)
- [ ] Accessibility (a11y) improvements

---

**Last Updated**: March 20, 2026
**Version**: 1.0.0-beta

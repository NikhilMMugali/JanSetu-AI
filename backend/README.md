# 🚀 Backend API Documentation

## Overview

The JanSetu AI backend is a **Node.js + Express.js** server that handles:
- **API endpoints** for civic issue reporting and analysis
- **Google Vision AI integration** for image classification
- **Static file serving** for frontend pages
- **Database connections** to MongoDB/PostgreSQL
- **Authentication & session management**
- **Error handling & logging**
- **Security middleware** (CORS, rate limiting, helmet)

## 📁 Directory Structure

```
backend/
├── server.js                    # Main Express application
├── index.ts                     # TypeScript type definitions
├── package.json                 # Backend dependencies
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Environment variables template
│
├── routes/
│   └── vision.js                # Vision API routes
│
├── controllers/
│   └── visionController.js      # Vision API logic handler
│
├── services/
│   └── visionService.js         # Google Vision API integration
│
├── middlewares/
│   ├── errorHandler.js          # Global error handling
│   ├── requestLogger.js         # Request logging
│   └── auth.js                  # (Future) Authentication
│
├── utils/
│   ├── validators.js            # Input validation functions
│   ├── constants.js             # App constants & enums
│   └── helpers.js               # Helper functions
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or bun package manager
- Google Cloud Vision API key (optional, falls back to simulated mode)

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your configuration values in `.env`

### Running the Server

**Development Mode:**
```bash
npm run dev
# or
node server.js
```

**Production Mode:**
```bash
npm start
```

Server will start at `http://localhost:3000` (default)

## 🔌 API Endpoints

### Vision Analysis
- **POST** `/api/vision/analyze`
  - **Body**: `{ imageBase64: string }`
  - **Response**: `{ category, confidence, labels, ... }`
  - **Description**: Analyzes a civic issue image using Google Vision API

## 📋 Architecture Patterns

### MVC-like Structure
- **Routes**: Define HTTP endpoints
- **Controllers**: Handle request/response logic
- **Services**: Contain business logic and external API calls
- **Middlewares**: Cross-cutting concerns (auth, logging, error handling)
- **Utils**: Reusable helpers and constants

## 🔐 Security Best Practices

1. **API Keys**: Store in `.env`, never commit to version control
2. **CORS**: Configure allowed origins
3. **Rate Limiting**: Implement to prevent abuse
4. **Input Validation**: Validate all user inputs
5. **Error Handling**: Don't expose internal errors to clients

## 📚 Adding New Endpoints

1. Create a route in `/routes`:
```javascript
router.post('/new-endpoint', controller);
```

2. Create a controller in `/controllers`:
```javascript
export const handlerFunction = (req, res) => { /* ... */ };
```

3. Create a service in `/services` if needed:
```javascript
export const serviceFunction = async (data) => { /* ... */ };
```

## 🧪 Testing

(To be implemented)

```bash
npm run test
```

## 📦 Deployment

### Vercel
Update `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [{ "src": "backend/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/backend/server.js" }]
}
```

### Docker
```bash
docker build -t jansetu-backend .
docker run -p 3000:3000 jansetu-backend
```

## 📖 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment (development/production) | development |
| GOOGLE_VISION_API_KEY | Google Cloud Vision API key | (optional) |
| DATABASE_URL | MongoDB/PostgreSQL connection string | (required for DB) |
| JWT_SECRET | Secret for JWT tokens | (required for auth) |

## 🛠️ Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL with Mongoose/Prisma)
- [ ] User authentication & authorization
- [ ] Report management API
- [ ] Admin dashboard API
- [ ] Analytics and statistics endpoints
- [ ] WebSocket support for real-time updates
- [ ] Image upload to cloud storage (S3/GCS)
- [ ] Email notifications
- [ ] Unit and integration tests

## 📞 Support

For issues or questions, open a GitHub issue or contact the team.

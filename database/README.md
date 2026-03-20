# 🗄️ Database Documentation

## Overview

JanSetu AI uses **MongoDB** with **Mongoose ODM** as the primary database, with **PostgreSQL** as an alternative. This document covers data models, schema design, relationships, and queries.

---

## 📁 Database Structure

```
database/
├── README.md                      # This file
│
├── 📁 models/                     # Mongoose schemas
│   ├── User.js                    # User accounts & roles
│   ├── Report.js                  # Civic issue reports
│   ├── AdminLog.js                # Audit trail of admin actions
│   ├── UserWarning.js             # Community warnings
│   └── SuspensionAppeal.js        # Appeal submissions
│
└── 📁 migrations/                 # Database migrations (future)
    └── 001_initial_schema.js
```
│   └── SuspensionAppeal.js      # Appeal management
│
├── migrations/                  # Database migrations (if using)
│   └── .gitkeep
│
└── README.md                    # This file
```

## 🗄️ Database Technology Options

### Option 1: MongoDB with Mongoose (Recommended for MVP)
- **Pros**: Flexible schema, quick development, document-based
- **Cons**: Not ACID-compliant (in transactions only)
- **Setup**:
```bash
npm install mongoose
```

### Option 2: PostgreSQL with Prisma (Recommended for Production)
- **Pros**: Strong ACID compliance, relational, type-safe
- **Cons**: Requires schema planning
- **Setup**:
```bash
npm install @prisma/client
npm install -D prisma
```

## 📊 Data Models

### User Schema
```javascript
{
  username: String (unique, 3-20 chars),
  email: String (unique),
  password: String (hashed),
  name: String,
  role: 'citizen' | 'admin' | 'developer',
  city: String,
  points: Number,
  trustScore: Number (0-100),
  warningCount: Number,
  isSuspended: Boolean,
  joinDate: Date,
  isActive: Boolean
}
```

### Report Schema
```javascript
{
  reportId: String (unique),
  citizenId: ObjectId (ref: User),
  category: String (enum of civic issues),
  description: String,
  location: String,
  coordinates: { latitude, longitude },
  imageUrl: String,
  status: 'unresolved' | 'in_process' | 'resolved' | 'pending_review',
  severity: Number (1-5),
  aiAnalysis: {
    confidence: Number,
    labels: [String],
    isDamageFlagged: Boolean,
    isSpam: Boolean
  },
  votes: Number,
  voters: [ObjectId],
  assignedAdmin: ObjectId (ref: User),
  resolutionDate: Date,
  resolutionNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### AdminLog Schema
```javascript
{
  adminId: ObjectId (ref: User),
  action: String (enum),
  targetType: 'report' | 'user',
  targetId: ObjectId,
  details: Mixed,
  reason: String,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
```

### UserWarning Schema
```javascript
{
  userId: ObjectId (ref: User),
  reason: String,
  severity: Number (1-5),
  reportId: ObjectId (ref: Report),
  issuedBy: ObjectId (ref: User),
  createdAt: Date
}
```

### SuspensionAppeal Schema
```javascript
{
  userId: ObjectId (ref: User),
  reason: String,
  status: 'pending' | 'approved' | 'rejected',
  reviewedBy: ObjectId (ref: User),
  reviewNotes: String,
  createdAt: Date
}
```

## 🚀 Getting Started

### MongoDB Setup

1. **Local Development**:
```bash
# Install MongoDB Community Edition
# macOS:
brew install mongodb-community

# Start MongoDB:
brew services start mongodb-community

# Or Docker:
docker run -d -p 27017:27017 --name mongodb mongo
```

2. **Connection in backend**:
```javascript
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jansetu-ai')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));
```

3. **Add to `.env`**:
```
MONGODB_URI=mongodb://localhost:27017/jansetu-ai
```

### PostgreSQL Setup (Alternative)

1. **Docker**:
```bash
docker run -d -p 5432:5432 \
  -e POSTGRES_USER=jansetu \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=jansetu_ai \
  postgres:15
```

2. **Prisma Schema** (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Add to `.env`**:
```
DATABASE_URL=postgresql://jansetu:password@localhost:5432/jansetu_ai
```

## 🔑 Indexes & Performance

Key indexes for optimal query performance:

```javascript
// User indexes
db.users.createIndex({ username: 1 });
db.users.createIndex({ email: 1 });
db.users.createIndex({ city: 1 });

// Report indexes
db.reports.createIndex({ citizenId: 1, createdAt: -1 });
db.reports.createIndex({ status: 1 });
db.reports.createIndex({ category: 1 });
db.reports.createIndex({ "coordinates.latitude": "2d", "coordinates.longitude": "2d" });

// AdminLog indexes
db.adminlogs.createIndex({ adminId: 1, createdAt: -1 });
db.adminlogs.createIndex({ targetId: 1 });
db.adminlogs.createIndex({ createdAt: -1 });

// UserWarning indexes
db.userwarnings.createIndex({ userId: 1, createdAt: -1 });
```

## 🔐 Data Integrity & Constraints

- **User email/username**: UNIQUE constraint
- **Report reportId**: UNIQUE constraint
- **Foreign keys**: Cascade delete for related records
- **Password**: Always hash before storing (use bcrypt)
- **Timestamps**: Automatically maintained via `timestamps: true`

## 📈 Database Queries (Examples)

### Find all reports by city
```javascript
const reports = await Report.find()
  .populate('citizenId')
  .where('location').regex(new RegExp('Rajkot', 'i'));
```

### Get most voted reports
```javascript
const topReports = await Report.find()
  .sort({ votes: -1 })
  .limit(10);
```

### Track admin actions
```javascript
const adminActions = await AdminLog.find({ adminId: adminId })
  .sort({ createdAt: -1 })
  .limit(50);
```

## 🧹 Data Migration Strategy

For schema changes:

**With Mongoose**:
- Modify schema in model file
- Run data migration script

**With Prisma**:
```bash
npx prisma migrate dev --name migration_name
```

## 🛡️ Security Best Practices

1. **Passwords**: Always hash with bcrypt (min 10 rounds)
2. **API Keys**: Never store in database plaintext
3. **PII**: Encrypt sensitive data at rest
4. **Access Control**: Implement role-based access on queries
5. **Audit Trails**: Log all admin actions (already in AdminLog)
6. **Data Validation**: Validate input before DB operations

## 📋 Backup & Recovery

**MongoDB**:
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/jansetu-ai" --out=./backup

# Restore
mongorestore --uri="mongodb://localhost:27017/jansetu-ai" ./backup/jansetu-ai
```

**PostgreSQL**:
```bash
# Backup
pg_dump jansetu_ai > backup.sql

# Restore
psql jansetu_ai < backup.sql
```

## 🧪 Database Testing

```bash
npm install --save-dev jest mongodb-memory-server
```

## 🔮 Future Enhancements

- [ ] Implement database connection pooling
- [ ] Add caching layer (Redis)
- [ ] Set up automated backups
- [ ] Implement data archival strategy
- [ ] Add database replication
- [ ] Implement automated migrations
- [ ] Add database monitoring & alerts

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection timeout | Check MongoDB service is running, verify URI |
| Duplicate key error | Data already exists with unique constraint |
| Query too slow | Add index on frequently queried fields |
| Memory leak | Use `.lean()` for read-only queries |


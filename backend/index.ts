// TypeScript entry point for JanSetu AI Backend
// This file ensures TypeScript compatibility
// For JavaScript execution, use: node server.js

export interface CivicReport {
  id: string;
  citizenId: string;
  category: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  status: 'unresolved' | 'in_process' | 'resolved' | 'pending_review';
  severity: number;
  aiConfidence: number;
  aiLabels: string[];
  timestamp: string;
  votes: number;
}

export interface User {
  id: string;
  username: string;
  role: 'citizen' | 'admin' | 'developer';
  email?: string;
  name: string;
  city: string;
  joinDate: string;
  warningCount: number;
  isSuspended: boolean;
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  targetId: string;
  timestamp: string;
  details: Record<string, any>;
}

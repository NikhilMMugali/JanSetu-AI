import mongoose from 'mongoose';

/**
 * AdminLog Schema - Stores audit trail of admin actions
 */
const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: [
        'report_reviewed',
        'report_approved',
        'report_rejected',
        'user_warned',
        'user_suspended',
        'user_restored',
        'priority_changed',
        'assignment_changed',
      ],
      required: true,
    },
    targetType: {
      type: String,
      enum: ['report', 'user'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    details: mongoose.Schema.Types.Mixed,
    reason: String,
    ipAddress: String,
    userAgent: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model('AdminLog', adminLogSchema);

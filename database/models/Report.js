import mongoose from 'mongoose';

/**
 * Report Schema - Stores civic issue reports from citizens
 */
const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      unique: true,
      required: true,
    },
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Pothole',
        'Broken Streetlight',
        'Garbage',
        'Water Leakage',
        'Road Damage',
        'Illegal Dumping',
        'Graffiti',
        'Broken Sidewalk',
        'Traffic Signal Issue',
        'Debris',
        'Other',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    imageUrl: String,
    status: {
      type: String,
      enum: ['unresolved', 'in_process', 'resolved', 'pending_review'],
      default: 'unresolved',
    },
    severity: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    aiAnalysis: {
      confidence: Number,
      labels: [String],
      isDamageFlagged: Boolean,
      isSpam: Boolean,
    },
    votes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolutionDate: Date,
    resolutionNotes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);

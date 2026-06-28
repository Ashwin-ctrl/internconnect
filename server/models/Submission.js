const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  note: { type: String, default: '' },
  files: [{ filename: String, originalname: String, path: String, mimetype: String }],
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Reviewed', 'Approved'],
    default: 'Submitted'
  },
  score: { type: Number, default: null },
  feedback: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

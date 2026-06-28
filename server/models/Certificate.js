const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  studentName: { type: String, required: true },
  companyName: { type: String, required: true },
  internshipTitle: { type: String, required: true },
  duration: { type: String, required: true },
  certificateId: { type: String, unique: true, required: true },
  verificationUrl: { type: String, required: true },
  filePath: { type: String, default: '' },
  issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);

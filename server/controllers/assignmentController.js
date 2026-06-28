const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Internship = require('../models/Internship');
const Application = require('../models/Application');


const createAssignment = async (req, res) => {
  try {
    const { internshipId, title, description, deadline, assignedTo } = req.body;
    const internship = await Internship.findOne({ _id: internshipId, companyId: req.user._id });
    if (!internship) return res.status(404).json({ success: false, message: 'Internship not found or unauthorized' });

    const assignment = await Assignment.create({
      internshipId, companyId: req.user._id, title, description, deadline,
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
    });
    res.status(201).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getStudentAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ assignedTo: req.user._id })
      .populate('internshipId', 'title companyId')
      .populate('companyId', 'companyName logo')
      .sort({ deadline: 1 });

    
    const assignmentsWithStatus = await Promise.all(assignments.map(async (a) => {
      const submission = await Submission.findOne({ assignmentId: a._id, studentId: req.user._id });
      return { ...a.toObject(), submission: submission || null };
    }));

    res.json({ success: true, assignments: assignmentsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getCompanyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ companyId: req.user._id })
      .populate('internshipId', 'title')
      .populate('assignedTo', 'name email profileImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const submitAssignment = async (req, res) => {
  try {
    const { note } = req.body;
    const files = req.files ? req.files.map(f => ({
      filename: f.filename,
      originalname: f.originalname,
      path: `/uploads/assignments/${f.filename}`,
      mimetype: f.mimetype,
    })) : [];

    const existing = await Submission.findOne({ assignmentId: req.params.id, studentId: req.user._id });
    if (existing) {
      existing.note = note || existing.note;
      if (files.length) existing.files = files;
      existing.status = 'Submitted';
      existing.submittedAt = Date.now();
      await existing.save();
      return res.json({ success: true, submission: existing, message: 'Submission updated' });
    }

    const submission = await Submission.create({
      assignmentId: req.params.id, studentId: req.user._id, note, files, status: 'Submitted',
    });
    res.status(201).json({ success: true, submission, message: 'Assignment submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.id })
      .populate('studentId', 'name email profileImage college');
    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const reviewSubmission = async (req, res) => {
  try {
    const { status, feedback, score } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.id, { status, feedback, score }, { new: true }
    ).populate('studentId', 'name email');
    res.json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAssignment, getStudentAssignments, getCompanyAssignments, submitAssignment, getSubmissions, reviewSubmission };

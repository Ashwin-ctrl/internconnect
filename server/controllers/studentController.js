const User = require('../models/User');
const Application = require('../models/Application');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, phone, college, bio, skills, portfolio, education } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (college !== undefined) updates.college = college;
    if (bio !== undefined) updates.bio = bio;
    if (skills) updates.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    if (portfolio !== undefined) updates.portfolio = portfolio;
    if (education) updates.education = typeof education === 'string' ? JSON.parse(education) : education;

    if (req.file) updates.profileImage = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password -refreshToken');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resume: `/uploads/resumes/${req.file.filename}` },
      { new: true }
    ).select('-password -refreshToken');
    res.json({ success: true, user, message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProgress = async (req, res) => {
  try {
    const studentId = req.user._id;
    const applications = await Application.find({ studentId }).populate('internshipId', 'title duration');
    const assignments = await Assignment.find({ assignedTo: studentId });
    const submissions = await Submission.find({ studentId });

    const totalAssignments = assignments.length;
    const submittedAssignments = submissions.filter(s => ['Submitted', 'Reviewed', 'Approved'].includes(s.status)).length;
    const approvedAssignments = submissions.filter(s => s.status === 'Approved').length;

    const user = await User.findById(studentId).select('name skills college profileImage resume bio portfolio');

    
    let profileFields = ['name', 'phone', 'college', 'bio', 'skills', 'resume', 'portfolio', 'profileImage'];
    let completed = profileFields.filter(f => {
      const val = user[f];
      return val && (Array.isArray(val) ? val.length > 0 : val !== '');
    }).length;
    const profileCompletion = Math.round((completed / profileFields.length) * 100);

    const stats = {
      profileCompletion,
      totalApplications: applications.length,
      selectedApplications: applications.filter(a => a.status === 'Selected').length,
      completedInternships: applications.filter(a => a.status === 'Completed').length,
      totalAssignments,
      submittedAssignments,
      approvedAssignments,
      assignmentCompletion: totalAssignments ? Math.round((submittedAssignments / totalAssignments) * 100) : 0,
      skills: user.skills || [],
      recentApplications: applications.slice(0, 5),
    };
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, uploadResume, getProgress };

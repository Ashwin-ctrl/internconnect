const express = require('express');
const router = express.Router();
const {
  createAssignment, getStudentAssignments, getCompanyAssignments,
  submitAssignment, getSubmissions, reviewSubmission
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { uploadAssignment } = require('../middleware/upload');

router.post('/', protect, requireRole('company'), createAssignment);
router.get('/student', protect, requireRole('student'), getStudentAssignments);
router.get('/company', protect, requireRole('company'), getCompanyAssignments);
router.post('/:id/submit', protect, requireRole('student'), uploadAssignment.array('files', 5), submitAssignment);
router.get('/:id/submissions', protect, requireRole('company'), getSubmissions);
router.put('/submissions/:id', protect, requireRole('company'), reviewSubmission);

module.exports = router;

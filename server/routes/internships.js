const express = require('express');
const router = express.Router();
const {
  getInternships, getInternship, createInternship, updateInternship,
  deleteInternship, applyInternship, getCompanyInternships
} = require('../controllers/internshipController');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');


router.get('/', getInternships);
router.get('/:id', getInternship);


router.post('/:id/apply', protect, requireRole('student'), applyInternship);


router.get('/company/mine', protect, requireRole('company'), getCompanyInternships);
router.post('/', protect, requireRole('company'), createInternship);
router.put('/:id', protect, requireRole('company'), updateInternship);
router.delete('/:id', protect, requireRole('company'), deleteInternship);

module.exports = router;

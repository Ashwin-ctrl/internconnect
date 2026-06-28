const express = require('express');
const router = express.Router();
const {
  getStats, getUsers, toggleUser, getAllInternships,
  updateInternshipStatus, deleteDiscussion, getAllCertificates
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

router.use(protect, requireRole('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/toggle', toggleUser);
router.get('/internships', getAllInternships);
router.put('/internships/:id/approve', updateInternshipStatus);
router.delete('/discussions/:id', deleteDiscussion);
router.get('/certificates', getAllCertificates);

module.exports = router;

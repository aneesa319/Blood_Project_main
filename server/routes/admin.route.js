const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);
router.get('/users/search', adminController.searchUsers);
router.get('/users/export', adminController.exportAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.patch('/donors/:id/toggle-availability', adminController.toggleDonorAvailability);
router.get('/recent', adminController.getRecentRegistrations);
router.get('/blood-groups', adminController.getBloodGroupDistribution);
router.get('/donors/map', adminController.getAllDonorsForMap);

module.exports = router;

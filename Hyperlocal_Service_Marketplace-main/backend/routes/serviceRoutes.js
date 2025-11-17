import express from 'express';
import {
  getAllServices,
  getServicesByCategory,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getServiceById);

// Protected routes (admin only)
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;
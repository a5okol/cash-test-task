import express from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import { CommissionController } from '../controllers/CommissionController';

const router = express.Router();
const commissionController = new CommissionController();

router.post(
  '/calculate-commission',
  authMiddleware,
  commissionController.calculateCommission
);

export default router;

import express from 'express';
import { getDailySummary } from '../services/summary.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

const router = express.Router();

// router.use(authenticate);

router.get('/daily', async (req, res) => {
  try {
    const { date } = req.query;
    const summary = await getDailySummary(date);
    return successResponse(res, 200, 'Daily summary retrieved successfully.', summary);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve daily summary.', error.message);
  }
});

export default router;

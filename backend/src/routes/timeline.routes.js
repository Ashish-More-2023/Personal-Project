import express from 'express';
import * as timelineController from '../controllers/timeline.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateTimeline } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', timelineController.getAllTimelines);
router.get('/clashes', timelineController.checkClashes);
router.get('/:id', timelineController.getTimelineById);
router.post('/', validateTimeline, timelineController.createTimeline);
router.put('/:id', timelineController.updateTimeline);
router.delete('/:id', timelineController.deleteTimeline);

export default router;

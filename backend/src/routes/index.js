
import express from 'express';
import authRoutes from './auth.routes.js';
import workspaceRoutes from './workspace.routes.js';
import taskRoutes from './task.routes.js';
import timelineRoutes from './timeline.routes.js';
import eventRoutes from './event.routes.js';
import noteRoutes from './note.routes.js';
import summaryRoutes from './summary.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/tasks', taskRoutes);
router.use('/timelines', timelineRoutes);
router.use('/events', eventRoutes);
router.use('/notes', noteRoutes);
router.use('/summary', summaryRoutes);

export default router;

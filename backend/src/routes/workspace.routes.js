
import express from 'express';
import * as workspaceController from '../controllers/workspace.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateWorkspace } from '../middlewares/validate.middleware.js';

const router = express.Router();

// router.use(authenticate);

router.get('/', workspaceController.getAllWorkspaces);
router.get('/:id', workspaceController.getWorkspaceById);
router.get('/:id/stats', workspaceController.getWorkspaceStats);
router.post('/', validateWorkspace, workspaceController.createWorkspace);
router.put('/:id', validateWorkspace, workspaceController.updateWorkspace);
router.delete('/:id', workspaceController.deleteWorkspace);

export default router;

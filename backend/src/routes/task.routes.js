import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateTask } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;

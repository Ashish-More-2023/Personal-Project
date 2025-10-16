import express from 'express';
import * as eventController from '../controllers/event.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateEvent } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', validateEvent, eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;

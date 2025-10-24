import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateNote } from '../middlewares/validate.middleware.js';

const router = express.Router();

// router.use(authenticate);

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', validateNote, noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;

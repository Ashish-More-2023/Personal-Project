import * as noteService from '../services/note.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const getAllNotes = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    console.log('Fetching notes for Workspace ID:', workspaceId);
    const notes = await noteService.getAllNotes(workspaceId);
    return successResponse(res, 200, 'Notes retrieved successfully.', notes);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve notes.', error.message);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteService.getNoteById(id);

    if (!note) {
      return errorResponse(res, 404, 'Note not found.');
    }

    return successResponse(res, 200, 'Note retrieved successfully.', note);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve note.', error.message);
  }
};

export const createNote = async (req, res) => {
  try {
    const noteData = req.body;
    const note = await noteService.createNote(noteData);
    return successResponse(res, 201, 'Note created successfully.', note);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create note.', error.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteData = req.body;
    const note = await noteService.updateNote(id, noteData);
    return successResponse(res, 200, 'Note updated successfully.', note);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update note.', error.message);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await noteService.deleteNote(id);
    return successResponse(res, 200, 'Note deleted successfully.');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete note.', error.message);
  }
};

import * as workspaceService from '../services/workspace.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await workspaceService.getAllWorkspaces();
    return successResponse(res, 200, 'Workspaces retrieved successfully.', workspaces);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve workspaces.', error.message);
  }
};

export const getWorkspaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const workspace = await workspaceService.getWorkspaceById(id);

    if (!workspace) {
      return errorResponse(res, 404, 'Workspace not found.');
    }

    return successResponse(res, 200, 'Workspace retrieved successfully.', workspace);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve workspace.', error.message);
  }
};

export const createWorkspace = async (req, res) => {
  try {
    const { name, color } = req.body;
    const workspace = await workspaceService.createWorkspace({ name, color });
    return successResponse(res, 201, 'Workspace created successfully.', workspace);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create workspace.', error.message);
  }
};

export const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const workspace = await workspaceService.updateWorkspace(id, { name, color });
    return successResponse(res, 200, 'Workspace updated successfully.', workspace);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update workspace.', error.message);
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    await workspaceService.deleteWorkspace(id);
    return successResponse(res, 200, 'Workspace deleted successfully. All related data has been removed.');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete workspace.', error.message);
  }
};

export const getWorkspaceStats = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await workspaceService.getWorkspaceStats(id);
    return successResponse(res, 200, 'Workspace stats retrieved successfully.', stats);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve workspace stats.', error.message);
  }
};

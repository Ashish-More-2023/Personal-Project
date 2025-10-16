import * as taskService from '../services/task.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const getAllTasks = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const tasks = await taskService.getAllTasks(workspaceId);
    return successResponse(res, 200, 'Tasks retrieved successfully.', tasks);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve tasks.', error.message);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);

    if (!task) {
      return errorResponse(res, 404, 'Task not found.');
    }

    return successResponse(res, 200, 'Task retrieved successfully.', task);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve task.', error.message);
  }
};

export const createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await taskService.createTask(taskData);
    return successResponse(res, 201, 'Task created successfully.', task);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create task.', error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = req.body;
    const task = await taskService.updateTask(id, taskData);
    return successResponse(res, 200, 'Task updated successfully.', task);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update task.', error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    return successResponse(res, 200, 'Task deleted successfully.');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete task.', error.message);
  }
};

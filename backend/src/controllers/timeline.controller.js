import * as timelineService from '../services/timeline.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const getAllTimelines = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const timelines = await timelineService.getAllTimelines(workspaceId);
    return successResponse(res, 200, 'Timelines retrieved successfully.', timelines);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve timelines.', error.message);
  }
};

export const getTimelineById = async (req, res) => {
  try {
    const { id } = req.params;
    const timeline = await timelineService.getTimelineById(id);

    if (!timeline) {
      return errorResponse(res, 404, 'Timeline not found.');
    }

    return successResponse(res, 200, 'Timeline retrieved successfully.', timeline);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve timeline.', error.message);
  }
};

export const createTimeline = async (req, res) => {
  try {
    const timelineData = req.body;
    const result = await timelineService.createTimeline(timelineData);

    if (result.clashes && result.clashes.length > 0) {
      return successResponse(res, 201, 'Timeline created with clash warnings.', result);
    }

    return successResponse(res, 201, 'Timeline created successfully.', result);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create timeline.', error.message);
  }
};

export const updateTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const timelineData = req.body;
    const result = await timelineService.updateTimeline(id, timelineData);

    if (result.clashes && result.clashes.length > 0) {
      return successResponse(res, 200, 'Timeline updated with clash warnings.', result);
    }

    return successResponse(res, 200, 'Timeline updated successfully.', result);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update timeline.', error.message);
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    await timelineService.deleteTimeline(id);
    return successResponse(res, 200, 'Timeline deleted successfully.');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete timeline.', error.message);
  }
};

export const checkClashes = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const clashes = await timelineService.findAllClashes(workspaceId);
    return successResponse(res, 200, 'Clash detection completed.', clashes);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to check clashes.', error.message);
  }
};

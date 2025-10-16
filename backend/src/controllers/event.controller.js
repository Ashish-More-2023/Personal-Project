import * as eventService from '../services/event.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const getAllEvents = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    const events = await eventService.getAllEvents(workspaceId);
    return successResponse(res, 200, 'Events retrieved successfully.', events);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve events.', error.message);
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);

    if (!event) {
      return errorResponse(res, 404, 'Event not found.');
    }

    return successResponse(res, 200, 'Event retrieved successfully.', event);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to retrieve event.', error.message);
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    return successResponse(res, 201, 'Event created successfully.', event);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create event.', error.message);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const event = await eventService.updateEvent(id, eventData);
    return successResponse(res, 200, 'Event updated successfully.', event);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update event.', error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    return successResponse(res, 200, 'Event deleted successfully.');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete event.', error.message);
  }
};

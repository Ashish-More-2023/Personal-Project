import { errorResponse } from "../utils/response.util.js";

export const validateWorksapce = (req, res, next) => {
    const { name } = req.body;
    if(!name || name.trim() === ''){
        return errorResponse(res, 400, 'Workspace name is required');
    }

    if(name.length > 50){
        return errorResponse(res, 400, 'Workspace name should not exceed 50 characters');
    }
    next();
};


export const validateTask = (req, res, next) => {
    const { workspaceId, title } = req.body;
    if(!workspaceId || workspaceId.trim() === ''){
        return errorResponse(res, 400, 'Workspace ID is required');
    }
    if(!title || title.trim() === ''){
        return errorResponse(res, 400, 'Task title is required');
    }
    if(title.length > 100){
        return errorResponse(res, 400, 'Task title should not exceed 100 characters');
    }
    next();
};

export const validateTimeline = (req, res, next) => {
    const { workspaceId, title, startDate, endDate } = req.body;
    if(!workspaceId || workspaceId.trim() === ''){
        return errorResponse(res, 400, 'Workspace ID is required');
    }
    if(!title || title.trim() === ''){
        return errorResponse(res, 400, 'Timeline title is required');
    }
    if(title.length > 100){
        return errorResponse(res, 400, 'Timeline title should not exceed 100 characters');
    }   
    if(!startDate || !endDate){
        return errorResponse(res, 400, 'Start date and end date are required');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if(isNaN(start) || isNaN(end)){
        return errorResponse(res, 400, 'Invalid date format');
    }
    if(start >= end){
        return errorResponse(res, 400, 'Start date must be before end date');
    }
    next();
}


export const validateEvent = (req, res, next) => {
    const {workspaceId,title,eventDate} = req.body;
    if(!workspaceId || workspaceId.trim() === ''){
        return errorResponse(res, 400, 'Workspace ID is required');
    }
    if(!title || title.trim() === ''){
        return errorResponse(res, 400, 'Event title is required');
    }
    if(title.length > 100){
        return errorResponse(res, 400, 'Event title should not exceed 100 characters');
    }
    if(!eventDate){
        return errorResponse(res, 400, 'Event date is required');
    }
    const date = new Date(eventDate);
    if(isNaN(date.getTime)){
        return errorResponse(res, 400, 'Invalid date format');
    }

    next();

};

export const validateNote = (req, res, next) => {
    const { workspaceId, title, content } = req.body;
    if (!workspaceId || workspaceId.trim() === '') {
        return errorResponse(res, 400, 'Workspace ID is required');
    }
    if(!title || title.trim() === ''){
        return errorResponse(res, 400, 'Note title is required');
    }
    if(title.length > 100){
        return errorResponse(res, 400, 'Note title should not exceed 100 characters');
    }
    if(!content || content.trim() === ''){
        return errorResponse(res, 400, 'Note content is required');
    }
    next();
};
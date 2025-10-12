import { errorResponse } from "../utils/response.util.js";

export const errorHandler = (err, req, res, next) => {
    console.error("error",err);

    if(err.code === 'P2002'){
        return errorResponse(res,409,'Already exists');
    }

    if(err.code === 'P2025'){
        return errorResponse(res,404,'Record not found');
    }

    if(err.code === 'P2003'){
        return errorResponse(res,400,'Foreign key constraint failed');
    }

    if(err.name === 'ValidationError'){
        return errorResponse(res,400,err.message);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return errorResponse(res,statusCode,message,err.stack);
};


export const notFoundHandler = (req, res, next) => {
    return errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};
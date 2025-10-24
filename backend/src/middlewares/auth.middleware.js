import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { errorResponse } from '../utils/response.util.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'No token provided. Access denied.');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.auth.jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 401, 'Token expired. Please login again.');
    }
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 401, 'Invalid token. Access denied.');
    }
    return errorResponse(res, 500, 'Authentication failed.', error.message);
  }
};

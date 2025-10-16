import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return errorResponse(res, 400, 'ID and password are required.');
    }

    if (id !== config.auth.adminId) {
      return errorResponse(res, 401, 'Invalid credentials.');
    }

    if (password !== config.auth.adminPassword) {
      return errorResponse(res, 401, 'Invalid credentials.');
    }

    const token = jwt.sign(
      { id: config.auth.adminId },
      config.auth.jwtSecret,
      { expiresIn: config.auth.jwtExpiresIn }
    );

    return successResponse(res, 200, 'Login successful.', {
      token,
      user: { id: config.auth.adminId },
    });
  } catch (error) {
    return errorResponse(res, 500, 'Login failed.', error.message);
  }
};

export const verify = async (req, res) => {
  try {
    return successResponse(res, 200, 'Token is valid.', {
      user: req.user,
    });
  } catch (error) {
    return errorResponse(res, 500, 'Verification failed.', error.message);
  }
};

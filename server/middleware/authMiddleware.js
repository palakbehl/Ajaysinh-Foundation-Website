import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  // Check Authorization header for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Fallback to cookie
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ajaysinh_super_secure_jwt_secret_key_2026_change_in_production');
    
    // Check if offline/fallback admin or MongoDB is not connected
    if (decoded.id === 'fallback-admin-id' || mongoose.connection.readyState !== 1) {
      req.admin = {
        _id: 'fallback-admin-id',
        name: process.env.ADMIN_NAME || 'Ajaysinh Admin',
        email: process.env.ADMIN_EMAIL || 'admin@ajaysinhfoundation.org',
        role: decoded.role || 'superadmin',
      };
      return next();
    }

    // Find admin by ID (excluding password)
    let admin = null;
    try {
      admin = await Admin.findById(decoded.id);
    } catch (dbErr) {
      console.warn('DB query warning in protectAdmin:', dbErr.message);
    }

    if (!admin) {
      // If DB was not reachable or ID is default, fallback gracefully
      if (mongoose.connection.readyState !== 1 || decoded.role === 'superadmin') {
        req.admin = {
          _id: decoded.id,
          name: process.env.ADMIN_NAME || 'Ajaysinh Admin',
          email: process.env.ADMIN_EMAIL || 'admin@ajaysinhfoundation.org',
          role: decoded.role || 'superadmin',
        };
        return next();
      }

      return res.status(401).json({
        success: false,
        message: 'The admin account associated with this token no longer exists.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' 
        ? 'Session expired. Please log in again.' 
        : 'Invalid token. Authorization failed.',
    });
  }
};

export default protectAdmin;

const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

/**
 * Protect routes - Verify JWT token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User belonging to this token no longer exists');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed or expired');
  }
});

/**
 * Grant access to specific roles (RBAC)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `User role '${req.user?.role || 'unknown'}' is not authorized to access this route`
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
const authMiddleware = (req, res, next) => {
    // Check if the request contains a valid authentication token
    // Verify the token and authenticate the user if valid
    // Set the authenticated user object on the request object, e.g., req.user
    // If authentication fails, respond with an error or redirect to the login page
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
  
  module.exports = authMiddleware;
  
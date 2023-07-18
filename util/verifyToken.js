require('dotenv').config()
const jwt = require('jsonwebtoken')
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token part from the "Bearer <token>" format
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ error: 'Invalid token' });
        } else {
          req.data = decoded; // Store the decoded user information in the request object
          next();
        }
      });
    } else {
      res.status(401).json({ error: 'Token not provided' });
    }
  };

  module.exports = verifyToken
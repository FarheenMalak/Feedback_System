const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

async function requireAuth(req) {
  try {
    const token = req.cookies?.Authorization;

    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.SECRET);

    if (Date.now() > decoded.exp * 1000) throw new Error("Token expired");

    const user = await User.findById(decoded.sub);

    if (!user) throw new Error("User not found");

    return user; // return the authenticated user
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

module.exports = requireAuth;

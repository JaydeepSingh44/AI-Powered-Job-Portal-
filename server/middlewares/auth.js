const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token from header:", token);
  }

  // Get token from cookies (optional)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookies:", token);
  }

  // No token found
  else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // IMPORTANT FIX
    req.user = decoded;   // <- Correct place to store user

    next();   // <- Move next() here (inside try)
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

// ROLE Middlewares
exports.isjobSeeker = (req, res, next) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(401).json({
        success: false,
        message: "Protected route for job seekers only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

exports.isCompany = (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(401).json({
        success: false,
        message: "Protected route for companies only",
      });
    }
    next();   // FIX
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Protected route for admins only",
      });
    }
    next();   // FIX
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

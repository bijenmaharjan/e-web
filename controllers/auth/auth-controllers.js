const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

// Register user
const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: {
        email: newUser.email,
        role: newUser.role,
        userId: newUser._id,
      },
    });
  } catch (error) {
    console.error(`Error occurred during registration: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        userName: user.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          email: user.email,
          role: user.role,
          userId: user._id,
          userName: user.userName,
        },
      });
  } catch (error) {
    console.error(`Error occurred during login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

// Logout user
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

// Middleware to check authentication
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`Token verification failed: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

module.exports = { register, login, logout, authMiddleware };

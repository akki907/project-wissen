const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");
const User = require("../models/User.js");
const bcrypt = require('bcryptjs');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phone,password } = req.body;
  const user = await User.findOne({ phone });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name:`${user.first_name} ${user.last_name}`,
      isAdmin: user.role === 'Admin' ,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Phone or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {  phone } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  req.body.role = 'Admin'

  const user = await User.create(req.body);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name:`${user.first_name} ${user.last_name}`,
      isAdmin: user.role === 'Admin' ,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const {  phone } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if(req.body.SSN){
    const salt = await bcrypt.genSalt(10);
    req.body.SSN = await bcrypt.hash(req.body.SSN, salt);
  }

  const user = await User.create(req.body);
  if (user) {
    res.status(201).json({
      _id: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name:`${user.first_name} ${user.last_name}`,
      phone: user.phone,
      isAdmin: user.role === 'Admin' ,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.query).select('-SSN');
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  createUser
};

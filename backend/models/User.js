const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please add a First Name'],
  },
  last_name: {
    type: String,
    required: [true, 'Please add a Last Name'],
  },
  phone: {
    type: String,
    unique: true,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
    required: [true, 'Please add a Phone No'],
  },
  role: {
    type: String,
    enum: ['user', 'Admin'],
    default: 'user',
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  SSN: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // // Encrypt password using bcrypt
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('object',enteredPassword ,this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  permanentAddress: {
    province: String,
    district: String,
    municipality: String,
    ward: String
  },
  temporaryAddress: {
    province: String,
    district: String,
    municipality: String,
    ward: String
  },
  dob: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  nationality: String,
  expertise: String,
  desiredSkills: String,
  sectors: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
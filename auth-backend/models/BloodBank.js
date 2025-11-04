// models/BloodBank.js
const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  bloodInventory: {
    "O+": { type: Number, default: 0 },
    "O-": { type: Number, default: 0 },
    "A+": { type: Number, default: 0 },
    "A-": { type: Number, default: 0 },
    "B+": { type: Number, default: 0 },
    "B-": { type: Number, default: 0 },
    "AB+": { type: Number, default: 0 },
    "AB-": { type: Number, default: 0 },
  },
});

bloodBankSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("BloodBank", bloodBankSchema);

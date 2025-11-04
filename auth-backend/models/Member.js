const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number] },
    address: String,
  },

  notificationPreferences: {
    bloodRequests: { type: Boolean, default: true },
    emergencyAlerts: { type: Boolean, default: true },
  },
  lastDonationDate: Date,
  donationCount: { type: Number, default: 0 },
});

memberSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Member", memberSchema);

const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  patientName: { type: String, required: [true, "Patient name is required"] },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  unitsRequired: { type: Number, required: true, min: 1, max: 10 },
  hospital: {
    name: String,
    address: String,
    contact: String,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
    address: String,
  },
  urgency: {
    type: String,
    enum: ["critical", "urgent", "normal"],
    default: "normal",
  },
  status: {
    type: String,
    enum: ["pending", "fulfilled", "cancelled"],
    default: "pending",
  },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contactPhone: { type: String, required: true },
  additionalNotes: String,
  createdAt: { type: Date, default: Date.now },
});

bloodRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);

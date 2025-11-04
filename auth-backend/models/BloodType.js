const mongoose = require("mongoose");

const bloodTypeSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  canDonateTo: [String],
  canReceiveFrom: [String],
});

module.exports = mongoose.model("BloodType", bloodTypeSchema);

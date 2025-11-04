const BloodType = require("../models/BloodType");

exports.checkCompatibility = async (req, res) => {
  const { donor, recipient } = req.params;

  try {
    const donorData = await BloodType.findOne({ bloodGroup: donor });
    if (!donorData) {
      return res.status(404).json({ error: "Invalid donor blood type" });
    }

    const isCompatible = donorData.canDonateTo.includes(recipient);
    res.json({ donor, recipient, isCompatible });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllBloodTypes = async (req, res) => {
  try {
    const bloodTypes = await BloodType.find({}, "bloodGroup");
    res.json(bloodTypes.map((bt) => bt.bloodGroup));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
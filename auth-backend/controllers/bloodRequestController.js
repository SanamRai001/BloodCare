const BloodRequest = require("../models/BloodRequest");

exports.createRequest = async (req, res) => {
  try {
    const request = await BloodRequest.create(req.body);

    req.io.emit("new-blood-request", {
      bloodType: request.bloodType,
      units: request.unitsRequired,
      hospital: request.hospital.name,
      urgency: request.urgency,
      id: request._id,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

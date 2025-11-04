// routes/volunteerRoutes.js
const express = require("express");
const Volunteer = require("../models/Volunteer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res
      .status(201)
      .json({ message: "Volunteer application submitted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const Member = require("../models/Member");
const router = express.Router();

// POST - Create new member with location
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.fullName || !req.body.email || !req.body.bloodType) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and blood type are required",
      });
    }

    // Validate location data
    if (!req.body.location || !req.body.location.coordinates) {
      return res.status(400).json({
        success: false,
        message: "Location coordinates are required",
      });
    }

    const memberData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      bloodType: req.body.bloodType,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.location.coordinates.lng),
          parseFloat(req.body.location.coordinates.lat),
        ],
        address: req.body.location.address || "Selected Location",
      },
      termsAccepted: req.body.termsAccepted,
    };

    const member = new Member(memberData);
    const savedMember = await member.save();

    res.status(201).json({
      success: true,
      message: "Member registered successfully",
      data: savedMember,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message:
        err.code === 11000
          ? "Email already exists"
          : "Error registering member",
      error: err.message,
    });
  }
});

// GET - Get all members (with location filtering)
router.get("/", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    let query = {};

    if (lat && lng && radius) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      };
    }

    const members = await Member.find(query).select("-__v");
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching members",
      error: err.message,
    });
  }
});

// GET - Get single member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).select("-__v");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching member",
      error: err.message,
    });
  }
});

module.exports = router;

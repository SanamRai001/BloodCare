const express = require("express");
const BloodRequest = require("../models/BloodRequest");
const router = express.Router();

function calculateDistance(coord1, coord2) {
  const R = 6371e3;
  const φ1 = (coord1[1] * Math.PI) / 180;
  const φ2 = (coord2[1] * Math.PI) / 180;
  const Δφ = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const Δλ = ((coord2[0] - coord1[0]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

router.get("/", async (req, res) => {
  try {
    const { longitude, latitude, maxDistance, ...otherParams } = req.query;
    const location =
      longitude && latitude ? { longitude, latitude, maxDistance } : null;

    if (location && (isNaN(location.longitude) || isNaN(location.latitude))) {
      return res.status(400).json({
        success: false,
        error: "Invalid coordinates provided",
      });
    }

    const baseQuery = {};
    if (otherParams.bloodType) baseQuery.bloodType = otherParams.bloodType;
    if (otherParams.urgency) baseQuery.urgency = otherParams.urgency;
    if (otherParams.status) baseQuery.status = otherParams.status;
    if (otherParams.minUnits) {
      baseQuery.unitsRequired = { $gte: parseInt(otherParams.minUnits) };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let requests;
    let total;

    if (location) {
      const maxDist = parseInt(location.maxDistance) || 10000; // Default 10km in meters
      const coords = [
        parseFloat(location.longitude),
        parseFloat(location.latitude),
      ];

      requests = await BloodRequest.find({
        ...baseQuery,
        location: {
          $geoWithin: {
            $centerSphere: [coords, maxDist / 6371000], // Convert meters to radians
          },
        },
      })
        .sort({ urgency: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("requestedBy", "name email")
        .lean();

      // Calculate distances and sort by distance
      requests = requests
        .map((request) => ({
          ...request,
          distance: calculateDistance(coords, request.location.coordinates),
        }))
        .sort((a, b) => a.distance - b.distance);

      // Get count for pagination
      total = await BloodRequest.countDocuments({
        ...baseQuery,
        location: {
          $geoWithin: {
            $centerSphere: [coords, maxDist / 6371000],
          },
        },
      });
    } else {
      // Non-geospatial query
      requests = await BloodRequest.find(baseQuery)
        .sort({ urgency: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("requestedBy", "name email")
        .lean();

      total = await BloodRequest.countDocuments(baseQuery);
    }

    res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST create new blood request
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.patientName ||
      !req.body.bloodType ||
      !req.body.contactPhone
    ) {
      return res.status(400).json({
        success: false,
        error: "Patient name, blood type and contact phone are required",
      });
    }

    if (!req.body.location?.coordinates) {
      return res.status(400).json({
        success: false,
        error: "Location coordinates are required",
      });
    }

    const [longitude, latitude] = req.body.location.coordinates;
    if (isNaN(longitude) || isNaN(latitude)) {
      return res.status(400).json({
        success: false,
        error: "Invalid coordinates provided",
      });
    }

    const requestData = {
      ...req.body,
      location: {
        type: "Point",
        coordinates: req.body.location.coordinates,
        address: req.body.location.address || "Unknown address",
      },
      status: "pending", // Default status
      requestedBy: req.user?.id || null,
    };

    const newRequest = await BloodRequest.create(requestData);

    // Emit socket event if available
    if (req.app.get("io")) {
      req.app.get("io").emit("new-blood-request", {
        id: newRequest._id,
        bloodType: newRequest.bloodType,
        units: newRequest.unitsRequired,
        hospital: newRequest.hospital?.name || "Unknown hospital",
        location: newRequest.location,
        urgency: newRequest.urgency,
      });
    }

    res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (error) {
    console.error("Blood request error:", error);
    res.status(400).json({
      success: false,
      error: error.message.includes("validation")
        ? "Invalid data format: " + error.message
        : "Failed to create request",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .populate("requestedBy", "name email")
      .lean();

    if (!request) {
      return res.status(404).json({
        success: false,
        error: "Request not found",
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});
module.exports = router;

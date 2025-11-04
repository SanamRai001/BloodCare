const express = require("express");
const router = express.Router();
const {
  checkCompatibility,
  getAllBloodTypes,
} = require("../controllers/bloodController");

router.get("/compatibility/:donor/:recipient", checkCompatibility);

router.get("/types", getAllBloodTypes);

module.exports = router;

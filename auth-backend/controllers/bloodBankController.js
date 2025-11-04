const User = require("../models/User");

async function findNearestBloodBanks(userCoords, maxDistance = 50) {
  const bloodBanks = await User.find({
    role: "bloodbank",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userCoords, 
        },
        $maxDistance: maxDistance * 1000, 
      },
    },
  });
  return bloodBanks;
}
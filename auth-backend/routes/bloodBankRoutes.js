const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');
const { calculateDistance } = require('../utils/geoUtils');

// Search for blood banks with specific blood type near a location
router.get('/search', async (req, res) => {
    try {
        const { latitude, longitude, bloodType, maxDistance = 50 } = req.query;

        if (!latitude || !longitude || !bloodType) {
            return res.status(400).json({
                error: 'Latitude, longitude, and bloodType are required parameters'
            });
        }

        const validBloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
        if (!validBloodTypes.includes(bloodType)) {
            return res.status(400).json({
                error: 'Invalid blood type. Must be one of: ' + validBloodTypes.join(', ')
            });
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const distance = parseFloat(maxDistance);

        if (isNaN(lat)) {
            return res.status(400).json({ error: `Invalid latitude: ${latitude}` });
        }
        if (isNaN(lng)) {
            return res.status(400).json({ error: `Invalid longitude: ${longitude}` });
        }
        if (isNaN(distance)) {
            return res.status(400).json({ error: `Invalid maxDistance: ${maxDistance}` });
        }

        // Validate coordinate ranges
        if (lat < -90 || lat > 90) {
            return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
        }
        if (lng < -180 || lng > 180) {
            return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
        }

        const bloodBanks = await BloodBank.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]  
                    },
                    $maxDistance: distance * 1000  
                }
            },
            [`bloodInventory.${bloodType}`]: { $gt: 0 }
        });

        // Process results with proper distance calculation
        const results = bloodBanks.map(bank => {
            const [bankLng, bankLat] = bank.location.coordinates;
            
           
            let calculatedDistance;
            try {
                calculatedDistance = calculateDistance(lat, lng, bankLat, bankLng);
            } catch (err) {
                console.error('Distance calculation error:', err);
                calculatedDistance = 0;
            }

            return {
                id: bank._id,
                name: bank.name,
                address: bank.address,
                contact: bank.contact,
                location: bank.location,
                distance: calculatedDistance.toFixed(2),
                unitsAvailable: bank.bloodInventory[bloodType],
                hours: bank.hours || "9AM-5PM",  // Default if not specified
                website: bank.website || "https://redcross.org",
                lastUpdated: bank.updatedAt || new Date()
            };
        });

        // Sort by distance (nearest first)
        results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        res.json(results);
    } catch (error) {
        console.error('Error searching blood banks:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
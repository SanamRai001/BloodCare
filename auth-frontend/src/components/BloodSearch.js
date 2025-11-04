import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BloodSearch.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const bloodBankIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3261/3261622.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const BloodSearch = () => {
  const [bloodType, setBloodType] = useState("O-");
  const [distance, setDistance] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Get user location
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              setMapReady(true);
            },
            (error) => {
              console.warn("Using default location due to:", error);
              setUserLocation({ lat: 27.7172, lng: 85.324 }); // Kathmandu default
              setMapReady(true);
            }
          );
        } else {
          setUserLocation({ lat: 27.7172, lng: 85.324 });
          setMapReady(true);
        }
      } catch (err) {
        console.error("Location error:", err);
        setUserLocation({ lat: 27.7172, lng: 85.324 });
        setMapReady(true);
      }
    };
    getLocation();
  }, []);

  // Search for locations using Nominatim API
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`
      );
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search location");
    }
  };

  // Handle location selection from search results
  const handleLocationSelect = (result) => {
    setUserLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    });
    setSearchQuery(result.display_name);
    setShowSearchResults(false);
  };

  const searchBloodBanks = async () => {
    if (!userLocation) {
      setError("Location not available");
      return;
    }

    setLoading(true);
    setError("");
    setBloodBanks([]);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/blood-banks/search",
        {
          params: {
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            bloodType,
            maxDistance: distance,
          },
          timeout: 5000,
        }
      );

      if (!response.data || response.data.length === 0) {
        setError("No blood banks found with the selected criteria");
        return;
      }

      const formattedBanks = response.data.map((bank) => ({
        ...bank,
        location: {
          ...bank.location,
          coordinates: Array.isArray(bank.location.coordinates)
            ? bank.location.coordinates
            : [bank.location.coordinates[0], bank.location.coordinates[1]],
        },
        unitsAvailable:
          bank.unitsAvailable || bank.bloodInventory[bloodType] || 0,
      }));

      setBloodBanks(formattedBanks);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.error || err.message || "Failed to search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blood-donation-app">
      <header className="app-header">
        <h1>Find Blood Banks</h1>
      </header>

      <div className="search-controls">
        {/* Location Search */}
        <div className="form-group location-search">
          <label>Search Location:</label>
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city or address"
              onKeyPress={(e) => e.key === "Enter" && searchLocation()}
            />
            <button onClick={searchLocation} className="search-location-button">
              Search
            </button>
          </div>
          {showSearchResults && (
            <div className="search-results-dropdown">
              {searchResults.map((result) => (
                <div
                  key={result.place_id}
                  className="search-result-item"
                  onClick={() => handleLocationSelect(result)}
                >
                  {result.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blood Type Selection */}
        <div className="form-group">
          <label>Blood Type:</label>
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          >
            {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Selection */}
        <div className="form-group">
          <label>Max Distance (km):</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Math.max(1, e.target.value))}
            min="1"
          />
        </div>

        <button
          onClick={searchBloodBanks}
          disabled={loading}
          className="search-button"
        >
          {loading ? "Searching..." : "Find Blood Banks"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="results-container">
        {/* Map Section */}
        <div className="map-section">
          {mapReady && (
            <MapContainer
              key={`map-${userLocation.lat}-${userLocation.lng}`}
              center={[userLocation.lat, userLocation.lng]}
              zoom={13}
              className="map"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>Your Location</Popup>
              </Marker>

              {bloodBanks.map((bank) => (
                <Marker
                  key={bank.id}
                  position={[
                    bank.location.coordinates[1],
                    bank.location.coordinates[0],
                  ]}
                  icon={bloodBankIcon}
                >
                  <Popup>
                    <div className="popup-content">
                      <h3>{bank.name}</h3>
                      <p>{bank.address}</p>
                      <p>
                        <strong>Contact:</strong> {bank.contact}
                      </p>
                      <p>
                        <strong>Available {bloodType}:</strong>{" "}
                        {bank.unitsAvailable} units
                      </p>
                      <p>
                        <strong>Distance:</strong> {bank.distance} km
                      </p>
                      <div className="popup-actions">
                        <a
                          href={`tel:${bank.contact}`}
                          className="action-button call"
                        >
                          Call
                        </a>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${bank.location.coordinates[1]},${bank.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-button directions"
                        >
                          Directions
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h2>Available Blood Banks</h2>

          {loading ? (
            <div className="loading-message">Searching for blood banks...</div>
          ) : bloodBanks.length === 0 ? (
            <div className="empty-message">
              {error
                ? error
                : "No blood banks found. Try adjusting your search criteria."}
            </div>
          ) : (
            <div className="blood-bank-list">
              {bloodBanks.map((bank) => (
                <div key={bank.id} className="blood-bank-card">
                  <h3>{bank.name}</h3>
                  <p className="address">{bank.address}</p>

                  <div className="bank-details">
                    <p>
                      <span>Contact:</span> {bank.contact}
                    </p>
                    <p>
                      <span>Available {bloodType}:</span> {bank.unitsAvailable}{" "}
                      units
                    </p>
                    <p>
                      <span>Distance:</span> {bank.distance} km
                    </p>
                  </div>

                  <div className="action-buttons">
                    <a
                      href={`tel:${bank.contact}`}
                      className="action-button call"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${bank.location.coordinates[1]},${bank.location.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button directions"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodSearch;

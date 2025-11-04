import React, { useState } from "react";
import "./BecomeMember.css";
import {
  FaHeart,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BecomeMember = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodType: "",
    location: {
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    termsAccepted: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      location: {
        address: location.address,
        coordinates: {
          lat: location.lat,
          lng: location.lng,
        },
      },
    });
    setMapModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const benefits = [
    {
      icon: <FaHeart />,
      title: "Save Lives",
      description: "Directly contribute to saving lives",
    },
    {
      icon: <FaCheck />,
      title: "Health Checkups",
      description: "Free regular health screenings",
    },
    {
      icon: <FaUser />,
      title: "Priority Service",
      description: "Expedited service in emergencies",
    },
  ];

  const testimonials = [
    {
      quote:
        "Joining as a donor gave me a sense of purpose knowing I'm helping others in need.",
      author: "Rahul Sharma, Regular Donor",
    },
  ];

  return (
    <div className="become-member-container">
      <section className="member-hero">
        <div className="hero-content">
          <h1>Become a Member</h1>
          <p>Join our life-saving community of blood donors</p>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Why Become a Member?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="registration-section">
        <div className="form-container">
          <h2>Membership Registration</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <div className="location-input-group">
                  <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                      type="text"
                      value={formData.location.address}
                      placeholder="Select your location on map"
                      readOnly
                      onClick={() => setMapModalOpen(true)}
                    />
                  </div>
                  <button
                    type="button"
                    className="map-button"
                    onClick={() => setMapModalOpen(true)}
                  >
                    Select on Map
                  </button>
                </div>
              </div>

              <div className="terms-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button type="submit" className="join-button">
                Join Now
              </button>
            </form>
          ) : (
            <div className="success-message">
              <FaHeart className="success-icon" />
              <h3>Thank You for Joining!</h3>
              <p>We'll contact you soon with more details.</p>
            </div>
          )}
        </div>
      </section>

      {mapModalOpen && (
        <MapModal
          onSelect={handleLocationSelect}
          onClose={() => setMapModalOpen(false)}
          initialLocation={formData.location.coordinates}
        />
      )}

      <section className="testimonials-section">
        <h2>What Our Members Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.quote}"</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

function LocationPicker({ onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        address: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(
          4
        )}`,
      });
    },
  });
  return null;
}

function MapModal({ onSelect, onClose, initialLocation }) {
  const center =
    initialLocation.lat && initialLocation.lng
      ? [initialLocation.lat, initialLocation.lng]
      : [27.7172, 85.324]; // Default to Kathmandu

  return (
    <div className="map-modal">
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker onLocationSelect={onSelect} />
          {initialLocation.lat && initialLocation.lng && (
            <Marker position={[initialLocation.lat, initialLocation.lng]} />
          )}
        </MapContainer>
        <button className="close-map" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default BecomeMember;

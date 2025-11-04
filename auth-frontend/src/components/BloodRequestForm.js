import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Card,
  Badge,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaUser,
  FaTint,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaNotesMedical,
  FaExclamationTriangle,
  FaList,
  FaInfoCircle,
} from "react-icons/fa";

const BloodRequestForm = () => {
  const initialFormState = {
    patientName: "",
    bloodType: "",
    unitsRequired: 1,
    hospital: { name: "", address: "", contact: "" },
    contactPhone: "",
    urgency: "normal",
    additionalNotes: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.hospital) {
      setFormData((prev) => ({
        ...prev,
        hospital: { ...prev.hospital, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            coordinates: [position.coords.longitude, position.coords.latitude],
            address: "Current location",
          });
        },
        (err) => setError(`Location error: ${err.message}`)
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (
      !formData.patientName ||
      !formData.bloodType ||
      !formData.contactPhone
    ) {
      setError("Please fill all required fields");
      return;
    }
    if (!location) {
      setError("Please set your location");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        location: {
          coordinates: location.coordinates,
          address: location.address,
        },
      };

      const response = await fetch("http://localhost:5000/api/blood-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const data = await response.json();
      setShowSuccess(true);

      setTimeout(() => {
        setFormData(initialFormState);
        setLocation(null);
        navigate("/requests", {
          state: {
            success: true,
            newRequest: data,
          },
        });
      }, 1500);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const urgencyBadge = () => {
    const variants = {
      normal: { bg: "primary", text: "Normal (48h)" },
      urgent: { bg: "warning", text: "Urgent (24h)" },
      critical: { bg: "danger", text: "Critical (Immediate)" },
    };
    const current = variants[formData.urgency];
    return (
      <Badge bg={current.bg} className="ms-2">
        {current.text}
      </Badge>
    );
  };

  return (
    <div className="container py-4">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Request Submitted!</h3>
            <p>Your blood request has been received.</p>
          </div>
        </div>
      )}

      <Row>
        {/* Main Form Column */}
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-danger text-white">
              <h2 className="mb-0">
                <FaTint className="me-2" />
                New Blood Request
              </h2>
            </Card.Header>

            <Card.Body>
              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError("")}
                  dismissible
                >
                  <FaExclamationTriangle className="me-2" />
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Patient Information */}
                <Card className="mb-4 border-primary">
                  <Card.Header className="bg-primary text-white">
                    <FaUser className="me-2" />
                    Patient Details
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleChange}
                          required
                          placeholder="Enter patient's full name"
                        />
                      </InputGroup>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Blood Type *</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FaTint />
                            </InputGroup.Text>
                            <Form.Select
                              name="bloodType"
                              value={formData.bloodType}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Blood Type</option>
                              {[
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "AB+",
                                "AB-",
                                "O+",
                                "O-",
                              ].map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </Form.Select>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Units Required *</Form.Label>
                          <Form.Control
                            type="number"
                            name="unitsRequired"
                            min="1"
                            max="10"
                            value={formData.unitsRequired}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Hospital Information */}
                <Card className="mb-4 border-info">
                  <Card.Header className="bg-info text-white">
                    <FaHospital className="me-2" />
                    Hospital Information
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Hospital Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaHospital />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.hospital.name}
                          onChange={handleChange}
                          placeholder="Enter hospital name"
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contact Phone *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaPhone />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          required
                          placeholder="Enter contact number"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Urgency & Location */}
                <Card className="mb-4 border-warning">
                  <Card.Header className="bg-warning text-dark">
                    <FaExclamationTriangle className="me-2" />
                    Urgency & Location
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Urgency Level {urgencyBadge()}
                          </Form.Label>
                          <Form.Select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                          >
                            <option value="normal">Normal (48 hours)</option>
                            <option value="urgent">Urgent (24 hours)</option>
                            <option value="critical">
                              Critical (Immediate)
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Location *</Form.Label>
                          <div className="d-flex flex-column">
                            <Button
                              variant={location ? "outline-success" : "primary"}
                              onClick={getCurrentLocation}
                              className="mb-2"
                            >
                              <FaMapMarkerAlt className="me-2" />
                              {location
                                ? "Location Set"
                                : "Set Current Location"}
                            </Button>
                            {location && (
                              <small className="text-muted">
                                Coordinates:{" "}
                                {location.coordinates[0].toFixed(4)},{" "}
                                {location.coordinates[1].toFixed(4)}
                              </small>
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Additional Notes */}
                <Card className="mb-4 border-secondary">
                  <Card.Header className="bg-secondary text-white">
                    <FaNotesMedical className="me-2" />
                    Additional Information
                  </Card.Header>
                  <Card.Body>
                    <Form.Group>
                      <Form.Label>Notes</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaNotesMedical />
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          placeholder="Any special requirements or additional information"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Form Actions */}
                <div className="d-grid gap-2">
                  <Button
                    variant="danger"
                    type="submit"
                    disabled={loading || !location}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaTint className="me-2" />
                        Submit Blood Request
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side Button Column */}
        <Col lg={4} className="mt-lg-0 mt-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate("/requests")}
                className="d-flex align-items-center justify-content-center py-3"
              >
                <FaList className="me-2" />
                View Requests List
              </Button>
              <div className="text-center mt-3 text-muted small">
                <FaInfoCircle className="me-1" />
                View all current blood requests in your area
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .success-message {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          max-width: 400px;
        }
        .success-icon {
          font-size: 4rem;
          color: #28a745;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default BloodRequestForm;

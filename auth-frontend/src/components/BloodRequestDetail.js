import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaPhone,
  FaHospital,
  FaUser,
  FaTint,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const BloodRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/blood-requests/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch request");
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Request not found");
        }

        setRequest(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error Loading Request</Alert.Heading>
          <p>{error}</p>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="outline-danger" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="danger" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!request) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Request Not Found</Alert.Heading>
          <p>The requested blood donation record could not be found.</p>
          <Button
            variant="outline-warning"
            onClick={() => navigate("/requests")}
          >
            View All Requests
          </Button>
        </Alert>
      </Container>
    );
  }

  // Get urgency badge variant
  const getUrgencyVariant = () => {
    switch (request.urgency) {
      case "critical":
        return "danger";
      case "urgent":
        return "warning";
      default:
        return "primary";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="blood-request-detail py-4">
      <Button
        variant="outline-primary"
        onClick={() => navigate(-1)}
        className="mb-4 back-button"
      >
        <FaArrowLeft className="me-2" />
        Back to Requests
      </Button>

      <Card className="shadow-sm mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <h2 className="mb-0">
            <FaTint className="text-danger me-2" />
            Blood Request Details
          </h2>
          <Badge bg={getUrgencyVariant()} className="fs-6">
            {request.urgency.toUpperCase()}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <h4 className="mb-3 text-primary">
                <FaUser className="me-2" />
                Patient Information
              </h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Name:</strong> {request.patientName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Blood Type:</strong>{" "}
                  <Badge bg="danger">{request.bloodType}</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Units Needed:</strong> {request.unitsRequired}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong>{" "}
                  <Badge
                    bg={request.status === "fulfilled" ? "success" : "warning"}
                  >
                    {request.status.toUpperCase()}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={6}>
              <h4 className="mb-3 text-primary">
                <FaHospital className="me-2" />
                Contact Details
              </h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>
                    <FaPhone className="me-2" />
                    Phone:
                  </strong>{" "}
                  {request.contactPhone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    <FaHospital className="me-2" />
                    Hospital:
                  </strong>{" "}
                  {request.hospital?.name || "Not specified"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    <FaClock className="me-2" />
                    Request Date:
                  </strong>{" "}
                  {formatDate(request.createdAt)}
                </ListGroup.Item>
                {request.additionalNotes && (
                  <ListGroup.Item>
                    <strong>Notes:</strong> {request.additionalNotes}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Map Section */}
      {request.location?.coordinates && (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h4 className="mb-0">
              <FaMapMarkerAlt className="text-danger me-2" />
              Location
            </h4>
          </Card.Header>
          <Card.Body className="p-0" style={{ height: "400px" }}>
            <MapContainer
              center={[
                request.location.coordinates[1],
                request.location.coordinates[0],
              ]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[
                  request.location.coordinates[1],
                  request.location.coordinates[0],
                ]}
              >
                <Popup>
                  <strong>
                    {request.hospital?.name || "Request Location"}
                  </strong>
                  <br />
                  {request.location.address ||
                    "Blood donation request location"}
                </Popup>
              </Marker>
            </MapContainer>
          </Card.Body>
        </Card>
      )}

      <style jsx>{`
        .blood-request-detail {
          max-width: 1200px;
        }
        .back-button {
          transition: all 0.3s ease;
        }
        .back-button:hover {
          transform: translateX(-3px);
        }
        .list-group-item {
          padding: 0.75rem 1.25rem;
        }
        .list-group-item strong {
          min-width: 120px;
          display: inline-block;
        }
      `}</style>
    </Container>
  );
};

export default BloodRequestDetail;

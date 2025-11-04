import React, { useState, useEffect } from "react";
import {
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBloodRequests } from "../api/bloodRequestsApi";
import {
  FaSearch,
  FaHospital,
  FaPhone,
  FaNotesMedical,
  FaEye,
} from "react-icons/fa";

const BloodRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    bloodType: "",
    urgency: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await getBloodRequests(filters);
        setRequests(response.data);
      } catch (err) {
        setError(err.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [filters]);

  // Urgency badge variants
  const urgencyVariant = {
    critical: "danger",
    urgent: "warning",
    normal: "primary",
  };

  // Status badge variants
  const statusVariant = {
    pending: "warning",
    fulfilled: "success",
    cancelled: "secondary",
  };

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hospital?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="danger" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <h4>{error}</h4>
          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-danger">
          <strong>Blood Requests</strong>
        </h2>
        <Button
          variant="danger"
          onClick={() => navigate("/request-blood")}
          size="sm"
        >
          + New Request
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by patient or hospital..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Select
                  name="bloodType"
                  value={filters.bloodType}
                  onChange={(e) =>
                    setFilters({ ...filters, bloodType: e.target.value })
                  }
                >
                  <option value="">All Types</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Select
                  name="urgency"
                  value={filters.urgency}
                  onChange={(e) =>
                    setFilters({ ...filters, urgency: e.target.value })
                  }
                >
                  <option value="">All Urgency</option>
                  <option value="critical">Critical</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="fulfilled">Fulfilled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Request List */}
      {filteredRequests.length === 0 ? (
        <Card className="text-center shadow">
          <Card.Body>
            <h4 className="text-muted">No blood requests found</h4>
            <p>Try adjusting your search or filters</p>
            <Button
              variant="outline-danger"
              onClick={() => {
                setFilters({ bloodType: "", urgency: "", status: "" });
                setSearchTerm("");
              }}
            >
              Clear all filters
            </Button>
          </Card.Body>
        </Card>
      ) : (
        filteredRequests.map((request) => (
          <Card key={request._id} className="mb-3 shadow-sm hover-effect">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="mb-1">
                    <span className="h5">{request.patientName}</span>
                    <Badge bg="danger" className="ms-2">
                      {request.bloodType}
                    </Badge>
                  </Card.Title>
                  <div className="mb-2">
                    <Badge
                      bg={urgencyVariant[request.urgency]}
                      className="me-2"
                    >
                      {request.urgency.toUpperCase()}
                    </Badge>
                    <Badge bg={statusVariant[request.status] || "secondary"}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate(`/requests/${request._id}`)}
                >
                  <FaEye className="me-1" /> View
                </Button>
              </div>

              <div className="d-flex flex-wrap text-muted mt-2">
                <div className="me-4">
                  <FaHospital className="me-1" />
                  <small>
                    {request.hospital?.name || "Hospital not specified"}
                  </small>
                </div>
                <div className="me-4">
                  <strong>Units:</strong> {request.unitsRequired}
                </div>
                <div>
                  <FaPhone className="me-1" />
                  <small>{request.contactPhone}</small>
                </div>
              </div>

              {request.additionalNotes && (
                <div className="mt-2">
                  <FaNotesMedical className="me-1 text-muted" />
                  <small className="text-muted">
                    {request.additionalNotes}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default BloodRequestList;

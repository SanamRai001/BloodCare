import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import "./BloodForm.css";

const BloodForm = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [donor, setDonor] = useState("");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/blood/types")
      .then((res) => {
        setBloodTypes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch blood types");
        setIsLoading(false);
      });
  }, []);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!donor || !recipient) {
      setError("Please select both donor and recipient blood types");
      return;
    }
    setIsLoading(true);
    setError("");
    axios
      .get(
        `http://localhost:5000/api/blood/compatibility/${donor}/${recipient}`
      )
      .then((res) => {
        setResult(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error checking compatibility");
        setIsLoading(false);
      });
  };

  return (
    <div className="blood-form-container">
      <h2 className="blood-form-title">Blood Compatibility Checker</h2>
      {error && (
        <Alert variant="danger" className="blood-form-alert">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleCheck} className="blood-form">
        <Form.Group className="blood-form-group">
          <Form.Label className="blood-form-label">Donor Blood Type</Form.Label>
          <Form.Select
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
            className="blood-form-select"
            disabled={isLoading}
          >
            <option value="">Select Donor Blood Type</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="blood-form-group">
          <Form.Label className="blood-form-label">
            Recipient Blood Type
          </Form.Label>
          <Form.Select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="blood-form-select"
            disabled={isLoading}
          >
            <option value="">Select Recipient Blood Type</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="blood-form-button"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Check Compatibility"}
        </Button>
      </Form>

      {result && (
        <div className="blood-result-container">
          <h4 className="blood-result-title">Compatibility Result</h4>
          <p className="blood-result-text">
            Can <strong>{result.donor}</strong> donate to{" "}
            <strong>{result.recipient}</strong>?
          </p>
          <p
            className={`blood-result-status ${
              result.isCompatible ? "compatible" : "incompatible"
            }`}
          >
            {result.isCompatible
              ? "✅ Compatible - Safe to donate"
              : "❌ Incompatible - Do not donate"}
          </p>
          {result.isCompatible && (
            <p className="blood-result-note">
              Note: Always confirm with medical professionals before
              transfusion.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodForm;

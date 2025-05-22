// AuditFormPage1.js
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const AuditFormPage1 = ({ formData, handleChange }) => {
  // State to manage the past history field
  const [pastHistory, setPastHistory] = useState("");

  // State to manage the date fields
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle date changes
  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 ? diffDays : 0;
    }
    return "";
  };

  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>UHID</Form.Label>
            <Form.Control
              type="text"
              value={formData.UHID || ""}
              onChange={(e) => handleChange("UHID", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              value={formData.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sex</Form.Label>
            <Form.Control
              as="select"
              value={formData.Sex || ""}
              onChange={(e) => handleChange("Sex", e.target.value)}
            >
              <option className="text-secondary">Select-</option>
              <option className="text-secondary">Male</option>
              <option className="text-secondary">Female</option>
              <option className="text-secondary">Others</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mt-3">
            <Form.Label>Indication</Form.Label>
            <Form.Control
              type="text"
              value={formData.Indication || ""}
              onChange={(e) => handleChange("Indication", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mt-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              value={formData.Diagnosis || ""}
              onChange={(e) => handleChange("Diagnosis", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mt-3">
            <Form.Label>Past History</Form.Label>
            <Form.Control
              as="select"
              value={pastHistory}
              onChange={(e) => setPastHistory(e.target.value)}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group className="mt-3">
            <Form.Label>Co-morbidities</Form.Label>
            <Form.Control
              type="text"
              disabled={pastHistory === "No"}
              placeholder={pastHistory === "No" ? "Disabled" : "Enter details"}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Empirical Therapy given (Y/N)</Form.Label>
            <Form.Control
              as="select"
              value={formData.Empirical_Therapy || ""}
              onChange={(e) =>
                handleChange("Empirical_Therapy", e.target.value)
              }
            >
              <option className="text-secondary">Yes</option>
              <option className="text-secondary">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3 mt-3 border p-3 rounded">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Antibiotic Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.Antibiotic_name || ""}
              onChange={(e) => handleChange("Antibiotic_name", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Dose</Form.Label>
            <Form.Control
              type="text"
              value={formData.Dose || ""}
              onChange={(e) => handleChange("Dose", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Route</Form.Label>
            <Form.Control
              type="text"
              value={formData.Route || ""}
              onChange={(e) => handleChange("Route", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              type="text"
              value={formData.Frequency || ""}
              onChange={(e) => handleChange("Frequency", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Date fields for start and end date */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Started on</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (new Date(e.target.value) > new Date(endDate)) {
                  setEndDate(""); // Reset if endDate becomes invalid
                }
              }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Last Dose Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate} // Restricts selection before startDate
              disabled={!startDate} // Prevents picking end date before start date is chosen
            />
          </Form.Group>
        </Col>
        <Col xs={12} className="d-flex justify-content-end mt-2">
          <strong>Days Duration: {calculateDuration()}</strong>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Culture sent before starting (Y/N)</Form.Label>
            <Form.Control
              as="select"
              value={formData.Culture_sent_before_start || ""}
              onChange={(e) =>
                handleChange("Culture_sent_before_start", e.target.value)
              }
            >
              <option className="text-secondary">Select-</option>
              <option className="text-secondary">Yes</option>
              <option className="text-secondary">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Specimen</Form.Label>
            <Form.Control
              type="text"
              value={formData.Specimen || ""}
              onChange={(e) => handleChange("Specimen", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default AuditFormPage1;

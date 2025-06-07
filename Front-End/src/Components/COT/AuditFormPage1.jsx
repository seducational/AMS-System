// AuditFormPage1.js
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const AuditFormPage1 = ({ formData, handleChange,setFormData }) => {
  // State to manage the past history field
  const [pastHistory, setPastHistory] = useState("");

  // Sync local state with formData on mount or update
  useEffect(() => {
    setPastHistory(formData.Past_History || ""); // Note the capital 'P' to match the field name
  }, [formData.Past_History]);

  
  const [startDate, setStartDate] = useState(formData.Started_Date || "");
  const [endDate, setEndDate] = useState(formData.End_Date || "");
  
  useEffect(() => {
  const duration = calculateDuration();
  setFormData((prevData) => ({
    ...prevData,
    Started_Date: startDate,
    End_Date: endDate,
    Duration: duration,
  }));
}, [startDate, endDate]);

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

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
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
              value={formData.Age || ""}
              onChange={(e) => handleChange("Age", Number(e.target.value))}
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
              <option className="text-dark">Male</option>
              <option className="text-dark">Female</option>
              <option className="text-dark">Others</option>
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
              value={formData.Past_History || ""}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("Past_History", value);
                setPastHistory(value); // Keep local state in sync
              }}
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
              value={formData.Co_morbidities || ""}
              onChange={(e) => handleChange("Co_morbidities", e.target.value)}
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
              <option value="" className="text-secondary">
                Select-
              </option>
              <option value="Yes" className="text-dark">
                Yes
              </option>
              <option value="No" className="text-dark">
                No
              </option>
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
          <Form.Group className="mt-3">
            <Form.Label>Started on</Form.Label>
            <Form.Control
              type="date"
              value={startDate || ""}
              onChange={(e) => {
                const value = e.target.value;
                setStartDate(value);
              }}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mt-3">
            <Form.Label>Last Dose Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate || ""}
              min={startDate}
              disabled={!startDate}
              onChange={(e) => {
                const value = e.target.value;
                setEndDate(value);
                handleChange("End_Date", value);
                handleChange("Duration", calculateDuration());
              }}
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
              value={
                formData.Culture_sent_before_start === true
                  ? "Yes"
                  : formData.Culture_sent_before_start === false
                  ? "No"
                  : ""
              }
              onChange={(e) =>
                handleChange(
                  "Culture_sent_before_start",
                  e.target.value === "Yes"
                )
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

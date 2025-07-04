// AuditFormPage1.js
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const AuditFormPage1 = ({ formData, handleChange, setFormData, errors }) => {
  const [pastHistory, setPastHistory] = useState("");
  const [startDate, setStartDate] = useState(formData.Started_Date || "");
  const [endDate, setEndDate] = useState(formData.End_Date || "");

  useEffect(() => {
    setPastHistory(formData.Past_History || "");
  }, [formData.Past_History]);

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

  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>UHID <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.UHID || ""}
              onChange={(e) => handleChange("UHID", e.target.value)}
              isInvalid={!!errors.UHID}
            />
            <Form.Control.Feedback type="invalid">{errors.UHID}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Age <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Age || ""}
              onChange={(e) => handleChange("Age", e.target.value)}
              isInvalid={!!errors.Age}
            />
            <Form.Control.Feedback type="invalid">{errors.Age}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sex <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Sex || ""}
              onChange={(e) => handleChange("Sex", e.target.value)}
              isInvalid={!!errors.Sex}
            >
              <option value="">Select-</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.Sex}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mt-3">
            <Form.Label>Indication <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Indication || ""}
              onChange={(e) => handleChange("Indication", e.target.value)}
              isInvalid={!!errors.Indication}
            />
            <Form.Control.Feedback type="invalid">{errors.Indication}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mt-3">
            <Form.Label>Diagnosis <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Diagnosis || ""}
              onChange={(e) => handleChange("Diagnosis", e.target.value)}
              isInvalid={!!errors.Diagnosis}
            />
            <Form.Control.Feedback type="invalid">{errors.Diagnosis}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mt-3">
            <Form.Label>Past History <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Past_History || ""}
              onChange={(e) => {
                handleChange("Past_History", e.target.value);
                setPastHistory(e.target.value);
              }}
              isInvalid={!!errors.Past_History}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.Past_History}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group className="mt-3">
            <Form.Label>Co-morbidities {pastHistory === "Yes" && <span className="text-danger">*</span>}</Form.Label>
            <Form.Control
              type="text"
              value={formData.Co_morbidities || ""}
              onChange={(e) => handleChange("Co_morbidities", e.target.value)}
              disabled={pastHistory === "No"}
              placeholder={pastHistory === "No" ? "Disabled" : "Enter details"}
              isInvalid={!!errors.Co_morbidities}
            />
            <Form.Control.Feedback type="invalid">{errors.Co_morbidities}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Empirical Therapy <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Empirical_Therapy || ""}
              onChange={(e) => handleChange("Empirical_Therapy", e.target.value)}
              isInvalid={!!errors.Empirical_Therapy}
            >
              <option value="">Select-</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.Empirical_Therapy}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3 mt-3 border p-3 rounded">
        {[
          { label: "Antibiotic Name", key: "Antibiotic_name" },
          { label: "Dose", key: "Dose" },
          { label: "Route", key: "Route" },
          { label: "Frequency", key: "Frequency" }
        ].map(({ label, key }) => (
          <Col md={6} key={key}>
            <Form.Group>
              <Form.Label>{label} <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={formData[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                isInvalid={!!errors[key]}
              />
              <Form.Control.Feedback type="invalid">{errors[key]}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        ))}
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Started Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              isInvalid={!!errors.Started_Date}
            />
            <Form.Control.Feedback type="invalid">{errors.Started_Date}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Last Dose Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={endDate || ""}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={!startDate}
              isInvalid={!!errors.End_Date}
            />
            <Form.Control.Feedback type="invalid">{errors.End_Date}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="d-flex justify-content-end mt-2">
          <strong>Days Duration: {calculateDuration()}</strong>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Culture sent before starting <span className="text-danger">*</span></Form.Label>
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
                handleChange("Culture_sent_before_start", e.target.value === "Yes")
              }
              isInvalid={!!errors.Culture_sent_before_start}
            >
              <option value="">Select-</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.Culture_sent_before_start}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Specimen <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Specimen || ""}
              onChange={(e) => handleChange("Specimen", e.target.value)}
              isInvalid={!!errors.Specimen}
            />
            <Form.Control.Feedback type="invalid">{errors.Specimen}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default AuditFormPage1;

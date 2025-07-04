// AuditFormPage2.js
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const AuditFormPage2 = ({ formData, handleChange, changedAfterCulture, errors }) => {
  return (
    <Form>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Antibiotic changed after culture report <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Antibiotic_change_afer_culture || ""}
              onChange={(e) =>
                handleChange("Antibiotic_change_afer_culture", e.target.value)
              }
              isInvalid={!!errors.Antibiotic_change_afer_culture}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.Antibiotic_change_afer_culture}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {changedAfterCulture === "Yes" && (
        <Row className="mb-3 mt-3 border p-3 rounded">
          {["Antibiotic_name1", "Dose1", "Route1", "Frequency1"].map((field) => (
            <Col md={3} key={field}>
              <Form.Group>
                <Form.Label>{field.replace("1", "").replace("_", " ")} <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  isInvalid={!!errors[field]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[field]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          ))}
        </Row>
      )}

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Antibiotic Review -24hrs <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Antibiotic_review || ""}
              onChange={(e) => handleChange("Antibiotic_review", e.target.value)}
              isInvalid={!!errors.Antibiotic_review}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Antibiotic_review}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>De-escalation done <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.De_escalation || ""}
              onChange={(e) => handleChange("De_escalation", e.target.value)}
              isInvalid={!!errors.De_escalation}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.De_escalation}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Is Antibiotic in Reserve/Restricted category <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Is_Antibiotic_reserved || ""}
              onChange={(e) => handleChange("Is_Antibiotic_reserved", e.target.value)}
              isInvalid={!!errors.Is_Antibiotic_reserved}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.Is_Antibiotic_reserved}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Reserve Drug policy followed <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Reserve_drug_policy_followed || ""}
              onChange={(e) => handleChange("Reserve_drug_policy_followed", e.target.value)}
              isInvalid={!!errors.Reserve_drug_policy_followed}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.Reserve_drug_policy_followed}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Selection as per Policy / Guidelines <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={formData.Selection_as_per_policy || ""}
              onChange={(e) => handleChange("Selection_as_per_policy", e.target.value)}
              isInvalid={!!errors.Selection_as_per_policy}
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.Selection_as_per_policy}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Policy compliance (Scoring) <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              value={formData.Policy_compliance || ""}
              onChange={(e) => handleChange("Policy_compliance", e.target.value)}
              isInvalid={!!errors.Policy_compliance}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Policy_compliance}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group as={Row} className="d-flex flex-row align-items-center mt-3">
        <Form.Label as="legend" column sm={2}>
          Infection Type <span className="text-danger">*</span>
        </Form.Label>
        <Col sm={10}>
          {["MDRO", "VRE", "MRSA"].map((field) => (
            <Form.Check
              key={field}
              type="radio"
              inline
              label={field}
              name="infectionType"
              value={field}
              checked={formData.infectionType === field}
              onChange={(e) => handleChange("infectionType", e.target.value)}
              isInvalid={!!errors.infectionType}
            />
          ))}
          {errors.infectionType && (
            <div className="text-danger mt-1">{errors.infectionType}</div>
          )}
        </Col>
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.Remarks || ""}
          onChange={(e) => handleChange("Remarks", e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default AuditFormPage2;

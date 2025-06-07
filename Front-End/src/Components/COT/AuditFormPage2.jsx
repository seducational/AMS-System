import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const AuditFormPage2 = ({ formData, handleChange, changedAfterCulture }) => {
  return (
    <Form>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Antibiotic changed after culture report (Y/N)
            </Form.Label>
            <Form.Control
              as="select"
              value={formData.Antibiotic_change_afer_culture || ""}
              onChange={(e) =>
                handleChange("Antibiotic_change_afer_culture", e.target.value)
              }
            >
              <option value="">Select-</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {changedAfterCulture === "Yes" && (
        <Row className="mb-3 mt-3 border p-3 rounded">
          {["Antibiotic_name1", "Dose1", "Route1", "Frequency1"].map((field, idx) => (
            <Col md={3} key={field}>
              <Form.Group>
                <Form.Label>{field.replace("1", "").replace("_", " ")}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
      )}

      <Row className="mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Antibiotic Review -24hrs</Form.Label>
            <Form.Control
              type="text"
              value={formData.Antibiotic_review || ""}
              onChange={(e) => handleChange("Antibiotic_review", e.target.value)}
            />
          </Form.Group>
        </Col>

        {[
          { label: "De-escalation done (Y/N)", name: "De_escalation" },
          { label: "Is Antibiotic in Reserve/Restricted category (Y/N)", name: "Is_Antibiotic_reserved" }
        ].map(({ label, name }) => (
          <Col md={4} key={name}>
            <Form.Group>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                as="select"
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              >
                <option value="">Select-</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
        ))}
      </Row>

      <Row className="mt-3">
        {[
          { label: "Reserve Drug policy followed (Y/N)", name: "Reserve_drug_policy_followed" },
          { label: "Selection as per Policy / Guidelines (Y/N)", name: "Selection_as_per_policy" }
        ].map(({ label, name }) => (
          <Col md={6} key={name}>
            <Form.Group>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                as="select"
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              >
                <option value="">Select-</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
        ))}
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Policy compliance (Scoring)</Form.Label>
            <Form.Control
              type="text"
              value={formData.Policy_compliance || ""}
              onChange={(e) => handleChange("Policy_compliance", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {["MDRO", "VRE", "MRSA"].map((field) => (
          <Col md={4} key={field}>
            <Form.Group>
              <Form.Label>{field}</Form.Label>
              <Form.Control
                type="text"
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>

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

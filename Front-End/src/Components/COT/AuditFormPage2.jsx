// AuditFormPage2.js
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
              value={formData.changedAfterCulture || "Select-"}
              onChange={(e) =>
                handleChange("changedAfterCulture", e.target.value)
              }
            >
              <option>Select-</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Conditionally render these fields */}
      {changedAfterCulture === "Yes" && (
        <Row className="mb-3 mt-3 border p-3 rounded">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Antibiotic Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.antibioticName || ""}
                onChange={(e) => handleChange("antibioticName", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Dose</Form.Label>
              <Form.Control
                type="text"
                value={formData.dose || ""}
                onChange={(e) => handleChange("dose", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Route</Form.Label>
              <Form.Control
                type="text"
                value={formData.route || ""}
                onChange={(e) => handleChange("route", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                value={formData.frequency || ""}
                onChange={(e) => handleChange("frequency", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Antibiotic Review -24hrs</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>De-escalation done (Y/N)</Form.Label>
            <Form.Control
              as="select"
              value={formData.De_escalation || ""}
              onChange={(e) => handleChange("De_escalation", e.target.value)}
            >
              <option className="text-secondary">Select-</option>
              <option className="text-secondary">Yes</option>
              <option className="text-secondary">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>
              Is Antibiotic in Reserve/Restricted category (Y/N)
            </Form.Label>
            <Form.Control
              as="select"
              value={formData.Is_Antibiotic_reserved || ""}
              onChange={(e) =>
                handleChange("Is_Antibiotic_reserved", e.target.value)
              }
            >
              <option className="text-secondary">Select-</option>
              <option className="text-secondary">Yes</option>
              <option className="text-secondary">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Reserve Drug policy followed (Y/N)</Form.Label>
            <Form.Control
              as="select"
              value={formData.Reserve_drug_policy_followed || ""}
              onChange={(e) =>
                handleChange("Reserve_drug_policy_followed", e.target.value)
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
            <Form.Label>Selection as per Policy / Guidelines (Y/N)</Form.Label>
            <Form.Control
              as="select"
              value={formData.Selection_as_per_policy || ""}
              onChange={(e) =>
                handleChange("Selection_as_per_policy", e.target.value)
              }
            >
              <option className="text-secondary">Select-</option>
              <option className="text-secondary">Yes</option>
              <option className="text-secondary">No</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Policy compliance (Scoring)</Form.Label>
            <Form.Control
              type="text"
              value={formData.Policy_compliance || ""}
              onChange={(e) =>
                handleChange("Policy_compliance", e.target.value)
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>MDRO</Form.Label>
            <Form.Control
              type="text"
              value={formData.MDRO || ""}
              onChange={(e) => handleChange("MDRO", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>VRE</Form.Label>
            <Form.Control
              type="text"
              value={formData.VRE || ""}
              onChange={(e) => handleChange("VRE", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>MRSA</Form.Label>
            <Form.Control
              type="text"
              value={formData.MRSA || ""}
              onChange={(e) => handleChange("MRSA", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mt-3">
        <Form.Label>Remarks</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
};

export default AuditFormPage2;

// AuditForm.js
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AuditForm = () => {
  return (
    <Container className="border rounded-3 shadow-sm p-4 mt-4">
      <h3 className="mt-4 mb-3">Antibiotic Prescription Form</h3>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Sex</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mt-3">
              <Form.Label>Indication</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mt-3">
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mt-3">
              <Form.Label>Past history</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mt-3">
              <Form.Label>Co-morbidities</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Empirical Therapy given (Y/N)</Form.Label>
              <Form.Control as="select">
                <option className="text-secondary">Select-</option>
                <option className="text-secondary">Yes</option>
                <option className="text-secondary">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3 mt-3 border p-3 rounded">
          <Col md={3}>
            <Form.Group>
              <Form.Label>
                Antibiotic Name
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>
                Dose
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>
                Route
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>
                Frequency
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Started on</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Last Dose Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <span className="d-flex justify-content-end">Days Duration: </span>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Culture sent before starting (Y/N)</Form.Label>
              <Form.Control as="select">
                <option className="text-secondary">Select-</option>
                <option className="text-secondary">Yes</option>
                <option className="text-secondary">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Specimen</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Antibiotic changed after culture report (Y/N)
              </Form.Label>
              <Form.Control as="select">
                <option className="text-secondary">Select-</option>
                <option className="text-secondary">Yes</option>
                <option className="text-secondary">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Name Of New Antibiotic / Dose / Route / Frequency
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

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
              <Form.Control as="select">
                <option className="text-secondary">Select-</option>
                <option className="text-secondary">Y</option>
                <option className="text-secondary">N</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                Is Antibiotic in Reserve/Restricted category (Y/N)
              </Form.Label>
              <Form.Control as="select">
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
              <Form.Control as="select">
                <option className="text-secondary">Select-</option>
                <option className="text-secondary">Yes</option>
                <option className="text-secondary">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Selection as per Policy / Guidelines (Y/N)
              </Form.Label>
              <Form.Control as="select">
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
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>MDRO/VRE/MRSA</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mt-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AuditForm;

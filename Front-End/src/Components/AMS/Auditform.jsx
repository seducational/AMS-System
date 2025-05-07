// AuditForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuditForm = () => {
  const [formData, setFormData] = useState({
    srNo: '',
    uhid: '',
    ageSex: '',
    diagnosis: '',
    history: '',
    empiricalTherapy: 'No',
    antibioticGiven: '',
    startedOn: '',
    lastDose: '',
    duration: '',
    cultureSent: 'Yes',
    specimen: '',
    antibioticChanged: 'No',
    newAntibiotic: '',
    review24hrs: '',
    deEscalation: 'No',
    isReserve: 'No',
    policyFollowed: 'Yes',
    selectionAsPerGuidelines: 'Yes',
    policyCompliance: '100%',
    mdro: 'No',
    remarks: 'N/A'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Container className="p-4 shadow rounded bg-light">
      <h4 className="text-center mb-4">Antibiotic Usage Audit Form</h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col><Form.Control name="srNo" placeholder="Sr No" onChange={handleChange} /></Col>
          <Col><Form.Control name="uhid" placeholder="UHID" onChange={handleChange} /></Col>
          <Col><Form.Control name="ageSex" placeholder="Age/Sex" onChange={handleChange} /></Col>
        </Row>

        <Row className="mb-3">
          <Col><Form.Control name="diagnosis" placeholder="Indication/Diagnosis" onChange={handleChange} /></Col>
          <Col><Form.Control name="history" placeholder="Past history/Co morbs" onChange={handleChange} /></Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select name="empiricalTherapy" onChange={handleChange}>
              <option value="No">Empirical Therapy Given (No)</option>
              <option value="Yes">Yes</option>
            </Form.Select>
          </Col>
          <Col><Form.Control name="antibioticGiven" placeholder="Antibiotic Name Given" onChange={handleChange} /></Col>
        </Row>

        <Row className="mb-3">
          <Col><Form.Control name="startedOn" type="date" placeholder="Started on" onChange={handleChange} /></Col>
          <Col><Form.Control name="lastDose" type="date" placeholder="Last Dose Date" onChange={handleChange} /></Col>
          <Col><Form.Control name="duration" placeholder="Days Duration" onChange={handleChange} /></Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select name="cultureSent" onChange={handleChange}>
              <option value="Yes">Culture Sent (Yes)</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>
          <Col><Form.Control name="specimen" placeholder="Specimen" onChange={handleChange} /></Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select name="antibioticChanged" onChange={handleChange}>
              <option value="No">Antibiotic Changed After Culture (No)</option>
              <option value="Yes">Yes</option>
            </Form.Select>
          </Col>
          <Col><Form.Control name="newAntibiotic" placeholder="New Antibiotic" onChange={handleChange} /></Col>
        </Row>

        {/* Auto-filled or default value section */}
        <Row className="mb-3">
          <Col><Form.Control name="review24hrs" placeholder="Antibiotic Review -24hrs" onChange={handleChange} /></Col>
          <Col>
            <Form.Select name="deEscalation" value={formData.deEscalation} onChange={handleChange}>
              <option value="No">De-escalation (No)</option>
              <option value="Yes">Yes</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select name="isReserve" value={formData.isReserve} onChange={handleChange}>
              <option value="No">Reserve Drug? (No)</option>
              <option value="Yes">Yes</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col><Form.Control name="policyFollowed" value={formData.policyFollowed} readOnly /></Col>
          <Col><Form.Control name="selectionAsPerGuidelines" value={formData.selectionAsPerGuidelines} readOnly /></Col>
          <Col><Form.Control name="policyCompliance" value={formData.policyCompliance} readOnly /></Col>
          <Col><Form.Control name="mdro" value={formData.mdro} readOnly /></Col>
          <Col><Form.Control name="remarks" value={formData.remarks} readOnly /></Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit">Submit Form</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AuditForm;

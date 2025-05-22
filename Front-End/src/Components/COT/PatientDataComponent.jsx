import React, { useState } from 'react';
import { Table, Button, DropdownButton, Dropdown, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import { FaStar, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AuditFormPage1 from "./AuditFormPage1";
import AuditFormPage2 from "./AuditFormPage2";
import { FaEye } from "react-icons/fa";

const patientData = [
  { id: 'P001', name: 'John Doe', age: 32, genderImg: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'active' },
  { id: 'P002', name: 'Jane Smith', age: 28, genderImg: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'inactive' },
  { id: 'P003', name: 'Michael Johnson', age: 45, genderImg: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'active' },
  { id: 'P004', name: 'Emily Brown', age: 36, genderImg: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'active' },
  { id: 'P005', name: 'David Wilson', age: 29, genderImg: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'inactive' },
  { id: 'P006', name: 'Sarah White', age: 51, genderImg: 'https://randomuser.me/api/portraits/women/6.jpg', status: 'active' },
  { id: 'P007', name: 'Kevin Lee', age: 40, genderImg: 'https://randomuser.me/api/portraits/men/7.jpg', status: 'active' },
];

const PatientDataComponent = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [changedAfterCulture, setChangedAfterCulture] = useState("Select-");

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (key === "changedAfterCulture") {
      setChangedAfterCulture(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShow(false);
    setPage(1);
  };

  return (
<>
    <Container className="my-4">
      <Row className="ms-auto mb-3 w-25">
        <Button variant="primary" className="d-flex justify-content-center align-items-center gap-2" onClick={() => setShow(true)}>
          <FaUserPlus />
          Add Patient
        </Button>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Health Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.age}</td>
              <td>
                <Image src={patient.genderImg} roundedCircle width={40} height={40} />
              </td>
              <td>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#f7c32e" />
                ))}
              </td>
              <td className='d-flex gap-2 justify-content-center'>
                <Button variant="primary">Edit</Button>
                <Button variant="secondary"><FaEye/></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Antibiotic Prescription Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {page === 1 && (
            <AuditFormPage1 formData={formData} handleChange={handleChange} />
          )}
          {page === 2 && (
            <AuditFormPage2
              formData={formData}
              handleChange={handleChange}
              changedAfterCulture={changedAfterCulture}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {page > 1 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {page < 2 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default PatientDataComponent;

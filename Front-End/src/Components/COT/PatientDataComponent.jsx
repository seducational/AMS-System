import React from 'react';
import { Table, Button, DropdownButton, Dropdown, Container, Row, Col, Image } from 'react-bootstrap';
import { FaStar, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  const Navigate = useNavigate();
  return (
    <Container className="my-4">
      <Row className="ms-auto mb-3 w-25">
        <Button variant="primary" className="d-flex justify-content-center align-items-center gap-2" onClick={() => Navigate('/form')}>
          <FaUserPlus />
          Add Patient
        </Button>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Health Score</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>
                <Image src={patient.genderImg} roundedCircle width={40} height={40} />
              </td>
              <td>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#f7c32e" />
                ))}
              </td>
              <td>
                <select className="form-select" defaultValue={patient.status}>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </td>
              <td>
                <Button variant="primary">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PatientDataComponent;

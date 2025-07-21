import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    userType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { firstName, middleName, lastName, email, password, userType } = formData;
    if (!firstName || !middleName || !lastName || !email || !password || !userType) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/register', formData);
      console.log('Registration Success:', response.data);
      alert('Account request send to admin successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error.response);
      alert('Msg: ' + (error.response?.data?.message || 'Registration failed.'));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5} className="bg-white p-4 rounded shadow">
          <h2 className="text-center mb-4">Create an account</h2>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMiddleName">
              <Form.Control
                type="text"
                placeholder="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="johndoe@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="**********"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserType">
              <Form.Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="" disabled>Select user type</option>
                {/* <option value="admin">Admin</option> */}
                <option value="user">COT</option>
                <option value="doctor">Doctor</option>
              </Form.Select>
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              style={{ backgroundColor: '#5e5eff', borderRadius: '8px' }}
            >
              Create Account
            </Button>

            <div className="text-center mt-3">
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;

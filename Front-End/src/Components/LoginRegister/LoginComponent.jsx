import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; // Import toast from react-toastify
import './LoginCompo.css'
const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setemail(''); // Jab role change ho toh input reset
    setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let payload = { email, password, userType: selectedRole };

    // if (selectedRole === 'doctor') {
    //   payload.doctorId = email; // Agar doctor hai toh doctorId bhej
    // } else {
    //   payload.username = email; // Admin/User hai toh username bhej
    // }

    // Console log the payload to verify it's being sent correctly
    console.log("Login Payload:", payload);

    axios.post('http://localhost:8000/auth/login', payload)
      .then((response) => {
        console.log('Login Success:', response.data); // Response log to check the data received
        toast.success("Login successful!");
        if(selectedRole==='user')
        {
         navigate('/patient-data');
        }
        else{
          alert("Home page")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error('Login Error Response:', error.response); // Log the full error response
          alert(`Error: ${error.response.data.message || 'Invalid credentials'}`); // More specific error message
        } else {
          console.error('Login Error:', error.message);
          alert('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-3">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={4} className="bg-white p-4 rounded shadow">
          <h1 className="text-center text-primary mb-4">Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicRole">
              <Form.Label>Select Role</Form.Label>
              <div className="d-flex gap-3 flex-wrap">
                <Form.Check
                  type="radio"
                  label="Admin"
                  name="role"
                  id="admin"
                  value="admin"
                  onChange={handleRoleChange}
                  checked={selectedRole === 'admin'}
                />
                <Form.Check
                  type="radio"
                  label="User"
                  name="role"
                  id="user"
                  value="user"
                  onChange={handleRoleChange}
                  checked={selectedRole === 'user'}
                />
                <Form.Check
                  type="radio"
                  label="Doctor"
                  name="role"
                  id="doctor"
                  value="doctor"
                  onChange={handleRoleChange}
                  checked={selectedRole === 'doctor'}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formUsernameOrId">
              <Form.Label>
                {selectedRole === 'admin' && 'Admin Username'}
                {selectedRole === 'user' && 'User Username'}
                {selectedRole === 'doctor' && 'Doctor Username'}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${selectedRole === 'doctor' ? 'Doctor Username' : 'Username'}`}
                className="mb-3"
                style={{ borderRadius: '8px' }}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="position-relative">
  <Form.Label>Password</Form.Label>
  <Form.Control
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    className="pe-5 custom-placeholder"
    autoComplete="new-password"
    inputMode="text"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  {/* Eye Icon */}
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      top: '38px',
      right: '15px',
      cursor: 'pointer',
      zIndex: 2,
      color: '#aaa',
    }}
  >
    {showPassword ? '👁️' : '🙈'} {/* Simple emoji icons for demo */}
  </span>
</Form.Group>


            <Form.Text className="text-muted text-center d-block mb-3">
  <Link to="/forgot-password">Forgot Password?</Link>
</Form.Text>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-2"
              style={{ backgroundColor: '#5e5eff', borderRadius: '8px' }}
            >
              Login
            </Button>

            <Form.Text className="text-center d-block mt-3">
              Don't have an account? <a href="/register">Register</a>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

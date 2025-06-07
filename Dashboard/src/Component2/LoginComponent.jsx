import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext'
import ams from "../assets/black_on_trans.png";
import '../App.css'
const LoginForm = () => {
  const { handleLogin,handleRoleChange,selectedRole,email,password,setemail,setPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Row className="w-100  justify-content-center mt-5 ">
       <div className="img d-flex justify-content-center">
                <img className="Iconimg2" src={ams} alt="Logo" />
              </div>
        <Col md={8} lg={4} className="bg-white p-4 rounded shadow">
          <h1 className="text-center text-primary mb-4">Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicRole">
              {/* <Form.Label>Select Role</Form.Label> */}
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
                {/* <Form.Check
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
                /> */}
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
    {showPassword ? '🙉' : '🙈'} {/* Simple emoji icons for demo */}
  </span>
</Form.Group>


            <Form.Text className="text-muted text-center d-block mb-3">
  <Link to="/forgot-password">Forgot Password?</Link>
</Form.Text>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-2"
              style={{ backgroundColor: "#5e5eff", borderRadius: "8px" }}
              onClick={(e) => {
                handleLogin(selectedRole); // pass the selected role
              }
            }
            >
              Login
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

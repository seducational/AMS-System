import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/send-otp", {
        email,
      });
      alert(response.data.message);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={4} className="bg-white p-4 rounded shadow">
          <h2 className="text-center mb-4">Forgot Password</h2>

          {!otpSent ? (
            <>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button
                className="w-100 mt-3"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formBasicOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Button className="w-100 mt-3" onClick={resetPassword}>
                Reset Password
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;

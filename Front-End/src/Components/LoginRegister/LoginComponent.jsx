import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleLoginfirst } = useAuth();
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setemail(""); // Jab role change ho toh input reset
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let payload = { email, password, userType: selectedRole };

    console.log("Login Payload:", payload);

    axios
      .post("http://localhost:8000/auth/login", payload)
      .then((response) => {
        console.log("Login Success:", response.data); // Response log to check the data received
        alert("Login successful!");
        // navigate("/patient-data"); // Redirect to patient data page after successful login
      })
      .catch((error) => {
        if (error.response) {
          console.error("Login Error Response:", error.response); // Log the full error response
          alert(
            `Error: ${error.response.data.message || "Invalid credentials"}`
          ); // More specific error message
        } else {
          console.error("Login Error:", error.message);
          alert("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
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
                  checked={selectedRole === "admin"}
                />
                <Form.Check
                  type="radio"
                  label="COT Team"
                  name="role"
                  id="user"
                  value="user"
                  onChange={handleRoleChange}
                  checked={selectedRole === "user"}
                />
                <Form.Check
                  type="radio"
                  label="Doctor"
                  name="role"
                  id="doctor"
                  value="doctor"
                  onChange={handleRoleChange}
                  checked={selectedRole === "doctor"}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formUsernameOrId">
              <Form.Label>
                {selectedRole === "admin" && "Admin Username"}
                {selectedRole === "user" && "COT Team Username"}
                {selectedRole === "doctor" && "Doctor Username"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${
                  selectedRole === "doctor" ? "Doctor Username" : "Username"
                }`}
                className="mb-3"
                style={{ borderRadius: "8px" }}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                className="mb-3"
                style={{ borderRadius: "8px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
                handleLoginfirst(selectedRole); // pass the selected role
              }
            }
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

// import React, { useState } from "react";
// import { Container, Form, Button, Row, Col } from "react-bootstrap";
// import RegisterForm from "./RegisterCompo";
// import { NavLink } from "react-router-dom";
// import { useAuth } from '../../AuthContext';
// import PatientDataComponent from "../COT/PatientDataComponent";

// const LoginForm = () => {
//   const { handleLogin } = useAuth();
//   const [selectedRole, setSelectedRole] = useState("");
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLoginValid = async (e) => {
//     e.preventDefault();

//     const success = await login(email, password); // simulate login logic
//     if (success) {
//       navigate(<PatientDataComponent/>); // redirect to homepage or dashboard
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center pt-5">
//       <Row className="w-100 justify-content-center">
//         <Col md={8} lg={4} className="bg-white p-4 rounded shadow">
//           <h1 className="text-center text-primary mb-4">Login</h1>
//           <Form onSubmit={handleLoginValid}>
//             <Form.Group controlId="formBasicRole">
//               <Form.Label>Select Role</Form.Label>
//               <div className="d-flex gap-3 flex-wrap">
//                 <Form.Check
//                   type="radio"
//                   label="Admin"
//                   name="role"
//                   id="admin"
//                   value="admin"
//                   onChange={handleRoleChange}
//                   checked={selectedRole === "admin"}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="cot"
//                   name="role"
//                   id="cot"
//                   value="cot"
//                   onChange={handleRoleChange}
//                   checked={selectedRole === "cot"}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Doctor"
//                   name="role"
//                   id="doctor"
//                   value="doctor"
//                   onChange={handleRoleChange}
//                   checked={selectedRole === "doctor"}
//                 />
//               </div>
//             </Form.Group>

//             {/* Admin Field */}
//             {selectedRole === "admin" && (
//               <Form.Group controlId="adminUsername">
//                 <Form.Label>Admin Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Admin"
//                   className="mb-3"
//                   style={{ borderRadius: "8px" }}
//                 />
//               </Form.Group>
//             )}

//             {/* COT Field */}
//             {selectedRole === "cot" && (
//               <Form.Group controlId="COTUsername">
//                 <Form.Label>COT Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={email}
//                   placeholder="Enter username"
//                   className="mb-3"
//                   style={{ borderRadius: "8px" }}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//             )}

//             {/* Doctor Field */}
//             {selectedRole === "doctor" && (
//               <Form.Group controlId="doctorId">
//                 <Form.Label>Doctor ID</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Doctor ID"
//                   className="mb-3"
//                   style={{ borderRadius: "8px" }}
//                 />
//               </Form.Group>
//             )}

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 placeholder="Enter password"
//                 className="mb-3"
//                 style={{ borderRadius: "8px" }}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Text className="text-muted text-center d-block mb-3">
//               <a href="#">Forgot Password?</a>
//             </Form.Text>

//             <Button
//               variant="primary"
//               type="submit"
//               className="w-100 mt-2"
//               style={{ backgroundColor: "#5e5eff", borderRadius: "8px" }}
//               onClick={(e) => {
//                 e.preventDefault(); // important: form submit prevent kar
//                 handleLogin(selectedRole); // pass the selected role
//               }}
//             >
//               Login
//             </Button>

//             {/* 👉 Add this below the Login button */}
//             <Form.Text className="text-center d-block mt-3" onClick={()=>{<RegisterForm />}}>
//               Don't have an account? <NavLink to="/register">Register</NavLink>
//             </Form.Text>

//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginForm;

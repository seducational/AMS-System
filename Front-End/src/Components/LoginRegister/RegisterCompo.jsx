import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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
    console.log(formData);

    // Simple form validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.userType) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/register', formData);
      console.log('Registration Success:', response.data);
      alert('Registration successful!');
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      console.error('Registration Error:', error.response);
      alert('Error: ' + (error.response?.data?.msg || 'Registration failed. Please try again.'));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5} className="bg-white p-4 rounded shadow">
          <h2 className="text-center mb-4">Create an account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Control
                type="text"
                placeholder="John Doe"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Form.Text muted>Please enter your name</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="johndoe@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Text muted>It should be an email address</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="**********"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Text muted>Use 8+ characters with a mix of letters, numbers & symbols</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserType">
              <Form.Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="" disabled>Select user type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </Form.Select>
              <Form.Text muted>Please select user type</Form.Text>
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
              <a href="#" onClick={() => navigate('/login')}>Login</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;







// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     userType: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Validation + API logic here
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center pt-5">
//       <Row className="w-100 justify-content-center">
//         <Col md={8} lg={5} className="bg-white p-4 rounded shadow">
//           <h2 className="text-center mb-4">Create an account</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formFullName">
//               <Form.Control
//                 type="text"
//                 placeholder="John Doe"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//               <Form.Text muted>Please enter your name</Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Control
//                 type="email"
//                 placeholder="johndoe@example.com"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <Form.Text muted>It should be an email address</Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPassword">
//               <Form.Control
//                 type="password"
//                 placeholder="**********"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <Form.Text muted>Use 8+ characters with a mix of letters, numbers & symbols</Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formUserType">
//               <Form.Select
//                 name="userType"
//                 value={formData.userType}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled>Select user type</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//                 <option value="doctor">Doctor</option>
//               </Form.Select>
//               <Form.Text muted>Please select user type</Form.Text>
//             </Form.Group>

//             <Button
//               type="submit"
//               className="w-100"
//               style={{ backgroundColor: '#5e5eff', borderRadius: '8px' }}
//             >
//               Create Account
//             </Button>

//             <div className="text-center mt-3">
//               Already have an account?{' '}
//               <a href="#" onClick={() => navigate('/login')} >Login</a>
             
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RegisterForm;

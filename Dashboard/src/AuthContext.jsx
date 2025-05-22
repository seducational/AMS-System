import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);//false change to ()
  const [activeTab, setActiveTab] = useState('Patient Data');
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

//   useEffect(() => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     setIsLoggedIn(true);
//   } else {
//     setIsLoggedIn(false);
//   }
// }, []);
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
        toast.success("Login Successful")
        setIsLoggedIn(true);
        localStorage.setItem("authToken", response.data.token);
        setActiveTab('Patient Data'); 
        if (selectedRole === 'admin') {
          navigate('/dashboard'); // Redirect to the main page for cot users
        }
        // else if (role === 'doctor') {
        //   setActiveTab('Patient Data'); // Default tab for user
        // }
        // else if (role === 'admin') {
        //   setActiveTab('Patient Data'); // Default tab for admin
        // }
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
  // const handleLoginfirst = (role) => {
  //   setIsLoggedIn(true);
  //   setUserRole(role);
  //   setActiveTab('Patient Data'); 
  //   if (role === 'user') {
  //     navigate('/patient-data'); // Redirect to the main page for cot users
  //   }
  //   // else if (role === 'doctor') {
  //   //   setActiveTab('Patient Data'); // Default tab for user
  //   // }
  //   // else if (role === 'admin') {
  //   //   setActiveTab('Patient Data'); // Default tab for admin
  //   // }
  // };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/'); // Redirect to the home page after logout
    setUserRole('');
    
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // true if token exists
  }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, activeTab,selectedRole,email,password,setemail,setPassword, handleLogin, handleRoleChange, handleLogout, setActiveTab}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

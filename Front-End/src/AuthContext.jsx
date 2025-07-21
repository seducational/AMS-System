import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initial state from localStorage for persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("authToken"));
  const [selectedRole, setSelectedRole] = useState(() => localStorage.getItem("role") || "admin");
  const [activeTab, setActiveTab] = useState("Patient Data");

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  // Handle role dropdown change
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setemail("");
    setPassword("");
  };

  // Handle Login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      userType: selectedRole,
    };

    try {
      const response = await axios.post("http://localhost:8000/auth/login", payload);

      toast.success("Login Successful!");

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", selectedRole);

      setIsLoggedIn(true);
      setSelectedRole(selectedRole);
      setActiveTab("Patient Data");

      // Navigate based on role
      if (selectedRole === "user" || selectedRole === "doctor") {
        navigate("/patientData");
      } else {
        navigate("/");
      }

    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Invalid credentials"}`);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/");
    setSelectedRole("");
  };

  // Restore login state on app mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      setSelectedRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        selectedRole,
        activeTab,
        email,
        password,
        setemail,
        setPassword,
        handleLogin,
        handleRoleChange,
        handleLogout,
        setActiveTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

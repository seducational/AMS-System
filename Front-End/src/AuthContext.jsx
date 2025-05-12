import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('Patient Data');
  const navigate = useNavigate();

  const handleLoginfirst = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setActiveTab('Patient Data'); 
    if (role === 'user') {
      navigate('/patient-data'); // Redirect to the main page for cot users
    }
    // else if (role === 'doctor') {
    //   setActiveTab('Patient Data'); // Default tab for user
    // }
    // else if (role === 'admin') {
    //   setActiveTab('Patient Data'); // Default tab for admin
    // }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/'); // Redirect to the home page after logout
  };

  
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, activeTab, handleLoginfirst, handleLogout, setActiveTab}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

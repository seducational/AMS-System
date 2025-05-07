import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('Patient Data');

  const handleLoginfisrt = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setActiveTab('Patient Data');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/login');
  };

  const login = async (email, password) => {
    if (email === "cot@example.com" && password === "1234") {
      setIsLoggedIn(true);
      setUserRole("cot");
      return true;
    }
    return false;
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, activeTab, handleLoginfisrt, handleLogout, setActiveTab, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React from 'react';
import { useAuth } from './AuthContext';
import LoginForm from './Component2/LoginComponent';
import Head from './Component2/Head';
import { Routes, Route } from 'react-router-dom';
// import Dashboard from './Component2/Dashboard'; // example dashboard
// import PatientData from './Component2/PatientData'; // if available
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Head />
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      )}
    </>
  );
}

export default App;

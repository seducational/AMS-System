import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import MainContent from "./MainContent";
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

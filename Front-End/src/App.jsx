import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import MainContent from "./MainContent";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Maintenance from "./Components/Maintenance";
const App = () => {
    const isMaintenance = true; // update ke time true

  if (isMaintenance) {
    return <Maintenance />;
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

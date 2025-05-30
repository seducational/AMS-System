import React from "react";
import { Routes, Route } from "react-router-dom";
import Appnavbar from "./Components/Navbar/Appnavbar";
import News from "./Components/News/News";
import LoginComponent from "./Components/LoginRegister/LoginComponent";
import RegisterComponent from "./Components/LoginRegister/RegisterCompo";
import PatientDataComponent from "./Components/COT/PatientDataComponent";
import ForgotPasswordForm from "./Components/LoginRegister/ForgotPasswordForm";
import ChatBoxComponent from "./Components/Chatbox/Chatbox1";

const MainContent = () => {
  return (
    <>
      <Appnavbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/patientData" element={<PatientDataComponent />} />
        <Route path="/chatbox" element={<ChatBoxComponent />} />
      </Routes>
    </>
  );
};

export default MainContent;

import React from "react";
import { Routes, Route, useNavigate,  } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import Appnavbar from "./Components/Navbar/Appnavbar";
import News from "./Components/News/News";
import LoginComponent from "./Components/LoginRegister/LoginComponent";
import RegisterComponent from "./Components/LoginRegister/RegisterCompo";
import PatientDataComponent from "./Components/COT/PatientDataComponent";
import ForgotPasswordForm from "./Components/LoginRegister/ForgotPasswordForm";
import ChatBoxComponent from "./Components/Chatbox/Chatbox1";
import AuditForm from "./Components/COT/Auditform";

const MainContent = () => {

  return (
    <>
      <Appnavbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<LoginComponent />} />
        {/* <Route path="/login" element={isLoggedIn ? navigate(<PatientDataComponent/>) : <LoginComponent />} /> */}
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/patientData" element={<PatientDataComponent />} />
        <Route path="/chatbox" element={<ChatBoxComponent />} />
        <Route path="/form" element={<AuditForm />} />
      </Routes>
    </>
  );
};

export default MainContent;

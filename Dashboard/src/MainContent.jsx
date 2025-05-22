import React from "react";
import { Routes, Route } from "react-router-dom";
// import Appnavbar from "./Components/Navbar/Appnavbar";
// import News from "./Components/News/News";
import LoginComponent from "./Component2/LoginComponent";
// import RegisterComponent from "./Components/LoginRegister/RegisterCompo";
// import PatientDataComponent from "./Components/COT/PatientDataComponent";
import ForgotPasswordForm from "./Component2/ForgotPasswordForm";
// import ChatBoxComponent from "./Components/Chatbox/Chatbox1";
// import AuditForm from "./Components/COT/Auditform";
import ProtectedRoute from "./ProtectedRoute"; // 

const MainContent = () => {
  return (
    <>
     
      <Routes>
        {/* <Route path="/" element={<News />} /> */}
        <Route path="/" element={<LoginComponent />} />
        {/* <Route path="/register" element={<RegisterComponent />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* 👇 Protected routes yahan wrap kar do */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientDataComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbox"
          element={
            <ProtectedRoute>
              <ChatBoxComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <AuditForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MainContent;

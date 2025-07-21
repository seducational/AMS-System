import React from "react";
import { Routes, Route } from "react-router-dom";
import Appnavbar from "./Components/Navbar/Appnavbar";
import News from "./Components/News/News";
import LoginComponent from "./Components/LoginRegister/LoginComponent";
import RegisterComponent from "./Components/LoginRegister/RegisterCompo";
import PatientDataComponent from "./Components/COT/PatientDataComponent";
import ForgotPasswordForm from "./Components/LoginRegister/ForgotPasswordForm";
import ChatBoxComponent from "./Components/Chatbox/Chatbox1";
// import AuditForm from "./Components/COT/Auditform";
import ProtectedRoute from "./ProtectedRoute";
import NotificationsList from "./Components/GetNotification/NotificationList/NotificationList";
const MainContent = () => {
  return (
    <>
      <Appnavbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* 👇 Protected routes yahan wrap kar do */}
        <Route
          path="/patientData"
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
        {/* <Route
          path="/form"
          element={
            <ProtectedRoute>
              <AuditForm />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <NotificationsList />
            </ProtectedRoute>
          }
        />
        <Route path="/patientData" element={<PatientDataComponent />} />
        <Route path="/chatbox" element={<ChatBoxComponent />} />
      </Routes>
    </>
  );
};

export default MainContent;

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

const MainContent = () => {
  // const navigate = useNavigate();
  // const { isLoggedIn, userRole, activeTab } = useAuth();

  // const renderTabComponent = () => {
  //   if (userRole === "cot") {
  //     switch (activeTab) {
  //       case "Patient Data":
  //         return <PatientDataComponent/>;      //<PatientData />
  //       case "Team Chat":
  //         return "Hello Team"; //<TeamChat />;
  //       case "Notifications":
  //         return "Hello Notofication"; //<Notifications />;
  //       default:
  //         return null;
  //     }
  //   }
  //   return null;
  // };

  return (
    <>
      <Appnavbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<LoginComponent />} />
        {/* <Route path="/login" element={isLoggedIn ? navigate(<PatientDataComponent/>) : <LoginComponent />} /> */}
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/patient-data" element={<PatientDataComponent />} />
        <Route path="/chatbox" element={<ChatBoxComponent />} />
      </Routes>

      {/* COT tabs content */}
      {/* {isLoggedIn && userRole === "cot" && renderTabComponent()} */}
    </>
  );
};

export default MainContent;

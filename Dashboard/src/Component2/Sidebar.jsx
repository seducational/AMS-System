import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { BsBarChartLineFill } from "react-icons/bs";
import { FaUserPlus, FaMoneyBillWave, FaMapMarkerAlt, FaGraduationCap, FaMapPin } from "react-icons/fa";
import { MdAppRegistration, MdOutlineFeedback, MdLocationOn } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbReport, TbMessageUser } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { LuCalendarCheck } from "react-icons/lu";
import { PiImageSquare } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { FcPlus } from "react-icons/fc";
import profile from "../assets/adminProfile.webp"
import './Sidebar.css';
import { useAuth } from "../AuthContext";
import axios from 'axios'

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fullName, setFullName] = useState("");
  const { isLoggedIn, selectedRole, activeTab, setActiveTab, handleLogout } =
  useAuth();
  const closeSidebar = () => setShow(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8000/auth/me", {
          headers: {
            "x-auth-token": token,
          },
        });
    
        const { firstName, middleName, lastName } = response.data;
        const middleInitial = middleName ? `${middleName[0]}.` : "";
        const fullName = `${firstName} ${middleInitial} ${lastName}`;
        setFullName(fullName.trim());
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data?.message || error.message
        );
      }
    };
    

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);
  
  const renderSidebarContent = () => (
    <>
      <div className="d-flex flex-column row-gap-2">
        {/* <div className="img d-flex justify-content-center">
          <img className="Iconimg" src={ams} alt="Logo" />
        </div> */}
        <div className="profileName mb-4 mt-3 d-flex flex-column align-items-center">
    <img
      src={profile} // 🔄 Replace with actual admin photo
      alt="Admin"
      className="rounded-circle mb-2"
      style={{ width: "60px", height: "60px", objectFit: "cover" }}
    />
    <span className="fw-semibold text-dark">{fullName}</span>
    <span className="text-muted" style={{ fontSize: "0.85rem" }}>Administrator</span>
  </div>
      </div>
      

      <Col className="menuList pb-4 d-flex flex-column gap-3">
        <NavLink to="/" className="Sidebar-menu" onClick={closeSidebar}>
          <BsBarChartLineFill className="me-3 fs-5 text-primary" /> Dashboard
        </NavLink>
        <NavLink to="/acountRequest" className="Sidebar-menu" onClick={closeSidebar}>
          <FaUserPlus className="me-3 fs-5 text-success" /> Account Request
        </NavLink>

        <div>
          <div
            className="Sidebar-menu d-flex justify-content-between align-items-center"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <span>
              <MdAppRegistration className="me-2 fs-5 text-info" /> Members
            </span>
            <IoIosArrowDropdown size={22} />
          </div>
          {showDropdown && (
            <div className="d-flex flex-column gap-2 ps-4 pt-2 text-dark">
              <Link to="/doctor" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapMarkerAlt className="me-2 text-secondary" /> Doctor
              </Link>
              <Link to="/cotTeam" className="Sidebar-menu" onClick={closeSidebar}>
                <FaGraduationCap className="me-2 text-danger" /> COT Team
              </Link>
              <Link to="/head/getstate" className="Sidebar-menu" onClick={closeSidebar}>
                <MdLocationOn className="me-2 text-info" /> Admin
              </Link>
              {/* <Link to="/head/district" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapPin className="me-2 text-warning" /> District
              </Link>
              <Link to="/head/city" className="Sidebar-menu" onClick={closeSidebar}>
                <FaMapPin className="me-2 text-success" /> City
              </Link> */}
            </div>
          )}
        </div>

        <Link to="/patientTable" className="Sidebar-menu" onClick={closeSidebar}>
        <FcPlus className="me-3 fs-5 " />Patient Data
        </Link>
        <Link to="/chatbox" className="Sidebar-menu" onClick={closeSidebar}>
          <AiOutlineCalendar className="me-3 fs-5 text-success" /> Chat Box
        </Link>
        {/* <Link to="/head/getfees" className="Sidebar-menu" onClick={closeSidebar}>
          <FaMoneyBillWave className="me-3 fs-5 text-primary" /> 
        </Link> */}
        <Link to="/pushNotification" className="Sidebar-menu" onClick={closeSidebar}>
          <TbReport className="me-3 fs-5 text-danger" /> Push Notification
        </Link>
        <Link to="/head/ivrequest" className="Sidebar-menu" onClick={closeSidebar}>
          <TbMessageUser className="me-3 fs-5 text-warning" /> Sign out
        </Link>
        {/* <Link to="/head/feeverification" className="Sidebar-menu" onClick={closeSidebar}>
          <GiConfirmed className="me-3 fs-5 text-secondary" /> Confirm Fees
        </Link>
        <Link to="/head/visitcomplete" className="Sidebar-menu" onClick={closeSidebar}>
          <LuCalendarCheck className="me-3 fs-5 text-info" /> Visited Colleges
        </Link> */}
        {/* <Link to="/head/media" className="Sidebar-menu" onClick={closeSidebar}>
          <PiImageSquare className="me-3 fs-5 text-info" /> Add Media
        </Link>
        <Link to="/head/feedback" className="Sidebar-menu" onClick={closeSidebar}>
          <MdOutlineFeedback className="me-3 fs-5 text-success" /> Feedback
        </Link> */}
      </Col>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay d-md-none ${show ? "show" : ""}`}>
        <div className="mobile-sidebar shadow p-3">
          <button className="btn-close mb-3" onClick={closeSidebar}></button>
          <Row className="mt-4 d-flex flex-column h-100">{renderSidebarContent()}</Row>
        </div>
        <div className="overlay-backdrop" onClick={closeSidebar}></div>
      </div>

      {/* Desktop Sidebar */}
      <Row className="Sidebar pt-4 pb-3 z-1 d-none d-md-block">{renderSidebarContent()}</Row>

      {/* Toggle Button */}
      <Button
        variant="primary"
        className="d-md-none"
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 2000 }}
        onClick={() => setShow(true)}
      >
        ☰
      </Button>
    </>
  );
};

export default Sidebar;

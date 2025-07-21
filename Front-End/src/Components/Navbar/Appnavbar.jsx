import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { LuShipWheel } from "react-icons/lu";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Dropdown,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import "./Navbar.css";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const AppNavbar = () => {
  const { isLoggedIn, selectedRole, activeTab, setActiveTab, handleLogout } = useAuth();
  const navigate = useNavigate();
  const cotTabs = ["Patient Data", "Team Chat", "Notifications"];
  const [fullName, setFullName] = useState("");
  const [hasNewNotification, setHasNewNotification] = useState(false); // 🔴

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("${import.meta.env.VITE_BACKEND_URL}/auth/me", {
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

  // 🔄 Poll for new notifications every 10 seconds
  useEffect(() => {
    const checkNewNotifications = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_BACKEND_URL}/notify/getNotification");
        const data = res.data;

        const lastSeen = localStorage.getItem("lastSeenNotificationTime");
        const latestNotificationTime = data?.[0]?.createdAt;

        if (
          latestNotificationTime &&
          (!lastSeen || new Date(latestNotificationTime) > new Date(lastSeen))
        ) {
          setHasNewNotification(true);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      }
    };

    if (isLoggedIn && selectedRole === "user") {
      checkNewNotifications();
      const interval = setInterval(checkNewNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, selectedRole]);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-light shadow-sm"
        style={{ height: "90px", position: "sticky", top: 0, zIndex: 1000 }}
      >
        <Container fluid>
          <Navbar.Brand className="fs-2 fw-bold text-dark">
            Antimicrobial Stewardship Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn && selectedRole === "user" && (
              <Nav className="me-auto ms-4">
                {cotTabs.map((tab) => (
                  <Nav.Link
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === "Patient Data") {
                        navigate("/patientData");
                      } else if (tab === "Team Chat") {
                        navigate("/chatbox");
                      } else if (tab === "Notifications") {
                        navigate("/notification");
                        localStorage.setItem(
                          "lastSeenNotificationTime",
                          new Date().toISOString()
                        );
                        setHasNewNotification(false); // 🧹 clear on click
                      }
                    }}
                    className={`fw-semibold ${
                      activeTab === tab
                        ? "text-primary border-bottom border-3 border-primary"
                        : "text-secondary"
                    }`}
                    style={{ marginRight: "1rem", position: "relative" }}
                  >
                    {tab}
                    {tab === "Notifications" && hasNewNotification && (
                      <span
                        style={{
                          backgroundColor: "red",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          position: "absolute",
                          top: "8px",
                          right: "0px",
                        }}
                      ></span>
                    )}
                  </Nav.Link>
                ))}
              </Nav>
            )}

            {!isLoggedIn && (
              <Nav className="d-flex w-75 justify-content-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "pe-4 align-self-center fs-5 custom-active"
                      : "pe-4 text-dark fs-5 align-self-center"
                  }
                  style={{ textDecoration: "none" }}
                >
                  Home
                </NavLink>
                <Nav.Link className="pe-4 fs-5">Help?</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>

          {isLoggedIn && selectedRole === "user" ? (
            <Dropdown align="end" className="ms-2">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="d-flex align-items-center icon-rounded text-secondary border-0"
              >
                <span className="me-">
                  <PersonCircle size={35} className="me-1" />
                  <span className="fw-bold">Hello!</span> <span className="fw-normal">{fullName}</span>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#setup">
                  <LuShipWheel size={18} className="me-2 text-info" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <BoxArrowRight size={16} className="me-2 text-danger" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Button
                className="rounded-4"
                variant="outline-primary"
                onClick={() => navigate("/login")}
              >
                <IoLogInOutline className="me-2 fs-4" />
                Log In
              </Button>
              <NavLink
                to="/Register"
                className="btn btn-primary rounded-4"
                role="button"
                onClick={() => navigate("/register")}
              >
                <IoLogInOutline className="me-2 fs-4" />
                Register
              </NavLink>
            </div>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AppNavbar;

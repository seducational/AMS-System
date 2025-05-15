import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { LuShipWheel } from "react-icons/lu";

import React from "react";
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

const AppNavbar = () => {
  const { isLoggedIn, selectedRole, activeTab, setActiveTab, handleLogout } =
    useAuth();
  const navigate = useNavigate();
  const cotTabs = ["Patient Data", "Team Chat", "Notifications"];

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-light shadow-sm"
        style={{ height: "90px", position: "sticky", top: 0, zIndex: 1000 }}
      >
        <Container fluid>
          {/* No heading or logo as per your request */}
          <Navbar.Brand className="fs-2 fw-bold text-dark">
            Antimicrobial Stewardship Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Show COT tabs only after login */}
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
                        navigate("/notifications");
                      }
                    }}
                    className={`fw-semibold ${
                      activeTab === tab
                        ? "text-primary border-bottom border-3 border-primary"
                        : "text-secondary"
                    }`}
                    style={{ marginRight: "1rem" }}
                  >
                    {tab}
                  </Nav.Link>
                ))}
              </Nav>
            )}

            {/* Show Home and Help for non-logged users */}
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

          {/* Right side buttons */}
          {isLoggedIn && selectedRole === "user"? (
            <Dropdown align="end" className="ms-2">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="d-flex align-items-center icon-rounded text-secondary border-0"
              >
                <PersonCircle size={35} className="me-1" />
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

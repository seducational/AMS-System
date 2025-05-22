import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import axios from "axios";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";


const HeaderComponent = () => {
  const { isLoggedIn, selectedRole, activeTab, setActiveTab, handleLogout } =
      useAuth();
  const [visitData, setVisitData] = useState([]);
  const [inactiveCount, setInactiveCount] = useState(0);

  const adminName = localStorage.getItem("admin_name");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((res) => {
        const data = res.data.userData;
        console.log(data);
        setVisitData(data);
        const count = data.filter((visit) => visit.Visit_accept === "pending" || visit.visit_cancelled === "cancelled").length;
        setInactiveCount(count);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  return (
    <Navbar expand="sm" className=" px-3" style={{ marginBottom: 0, background: " linear-gradient(135deg, #ffffff, #9ef4f2)" }}>
      {/* Align the toggle button to the right */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ms-auto"
        style={{ borderColor: "white", color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <h3 className="text-dark fs-4 ms-5 d-flex">
          <h4>Hello,👋</h4>{adminName}
        </h3>

        <Nav className="ms-auto d-flex align-items-center">
          

          {/* Notifications Icon with Badge */}
          <Nav.Link href="/head/notification" className="position-relative">
            <IoIosNotificationsOutline
              className="me-4 text-dark fw-bold"
              size={30}
            />
            {inactiveCount > 0 && (
              <span
                className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
                style={{ top: "15px", right: "5px" }}
              >
                {inactiveCount}
              </span>
            )}
          </Nav.Link>
          {/* User Icon */}
          {/* <Nav.Link href="#">
            <FaRegUser className="me-4 text-white fw-bold" size={24} />
          </Nav.Link> */}
          <Nav.Item>
            <Link to="/" onClick={handleLogout} className="btn btn-outline-danger d-flex align-items-center px-3 py-1">
              <IoIosLogOut size={22} className="me-2" />
              Logout
            </Link>
          </Nav.Item>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;

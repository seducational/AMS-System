import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import axios from "axios";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import ams from "../assets/black_on_trans.png";

const HeaderComponent = () => {
  const { isLoggedIn, selectedRole, activeTab, setActiveTab, handleLogout } =
    useAuth();
  const [visitData, setVisitData] = useState([]);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const adminName = localStorage.getItem("admin_name");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}auth/me`)
      .then((res) => {
        setVisitData(res.data);
        console.log("Admin Data : ", visitData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, []);

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}notify/getNotification`
        );
        const notifications = res.data;

        const lastSeen = localStorage.getItem(
          "adminLastSeenNotificationTime"
        );
        const latestNotificationTime = notifications?.[0]?.createdAt;

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

    checkNotifications();
    const interval = setInterval(checkNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    localStorage.setItem(
      "adminLastSeenNotificationTime",
      new Date().toISOString()
    );
    setHasNewNotification(false);
  };

  return (
    <Navbar
      expand="sm"
      className="px-3"
      style={{
        marginBottom: 0,
        background: "linear-gradient(135deg, #ffffff, #9ef4f2)",
        maxHeight: "80px",
      }}
    >
      {/* Align the toggle button to the right */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ms-auto"
        style={{ borderColor: "white", color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="img d-flex justify-content-center">
          <img className="Iconimg" src={ams} alt="Logo" />
        </div>

        <Nav className="ms-auto d-flex align-items-center">
          {/* Notifications Icon with Dot */}
          <Nav.Link
            href="/notification"
            className="position-relative"
            onClick={handleNotificationClick}
          >
            <IoIosNotificationsOutline
              className="me-2 text-dark fw-bold"
              size={30}
             
            />
            {hasNewNotification && (
              <span
                style={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  position: "absolute",
                  top: "8px",
                  right: "10px",
                }}
              ></span>
            )}
          </Nav.Link>

          {/* Logout Button */}
          <Nav.Item>
            <Link
              to="/"
              onClick={handleLogout}
              className="btn btn-outline-danger d-flex align-items-center px-3 py-1 ms-2"
            >
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

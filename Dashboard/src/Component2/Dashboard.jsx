import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserDoctor } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FcPlus } from "react-icons/fc";
import InfectionPieChart from "./Piechart/InfectionPieChart";
import ComplianceStats from "./DashboardContent/ComplianceStats";

const WaveSVG = ({ fill }) => (
  <svg
    viewBox="0 0 540 100"
    preserveAspectRatio="none"
    className="position-absolute bottom-0 start-0 w-100"
    style={{ height: 60, zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#38b000", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#a2f3e2", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ff8f61", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#ffc3a0", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#f06292", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#d1a7d6", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#1976d2", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#4fc3f7", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ffb74d", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#ffe0b2", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4db6ac", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#b2dfdb", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M0,40 
         C60,80 120,0 180,40 
         C240,80 300,0 360,40 
         C420,80 480,0 540,40 
         L540,100 L0,100 Z"
      fill={fill}
    />
  </svg>
);

const Card = ({ count, label, icon, color }) => (
  <div
    className="card rounded-4 overflow-hidden text-dark shadow-sm mb-4"
    style={{
      height: 180,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      position: "relative",
    }}
  >
    <div className="card-body position-relative z-1 d-flex justify-content-between align-items-start">
      <div>
        <h4 className="fw-bold mb-1" style={{ wordBreak: "break-word" }}>
          {count}
        </h4>
        <p className="mb-0 text-secondary">{label}</p>
      </div>
      <div className="fs-3 text-dark">{icon}</div>
    </div>
    <WaveSVG fill={color} />
  </div>
);

const Dashboard = () => {
  const [counts, setCounts] = useState({ doctorsCount: 0, cotTeamCount: 0 });
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/dashboard-counts`) 
      .then(res => {
        console.log("Dashboard Counts API response:", res.data);  // Add this line
        setCounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/patient/count`)
      .then((res) => {
        setPatientCount(res.data.totalPatients);
      })
      .catch((err) => {
        console.error("Error fetching patient count:", err);
      });
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Row className="gx-4">
          <Col md={4}>
            <Card
              count={counts.doctorsCount}
              label="Doctors"
              color="url(#grad2)"
              icon={<FaUserDoctor className="fs-3 " />}
            />
          </Col>
          <Col md={4}>
            <Card
              count={counts.cotTeamCount}
              label="COT Team"
              color="url(#grad6)"
              icon={<RiTeamFill className="fs-3 " />}
            />
          </Col>
          <Col md={4}>
            <Card
              count={patientCount}
              label="Patients Visits"
              color="url(#grad4)"
              icon={<FcPlus className="fs-3 " />}
            />
          </Col>
        </Row>
        <ToastContainer />
        <Row className="mt-4 align-items-stretch">
          <Col md={6}>
            <div
              className="card shadow-sm h-100"
              style={{ padding: "1rem", borderRadius: "1rem" }}
            >
              <h5 className="mb-3 text-center">
                🧫 Infection Type Distribution
              </h5>
              <InfectionPieChart />
            </div>
          </Col>
          <Col md={6}>
            <div
              className="card shadow-sm h-100"
              style={{ padding: "1rem", borderRadius: "1rem" }}
            >
              <h5 className="mb-3 text-center">📊 Compliance Metrics</h5>
              <ComplianceStats />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

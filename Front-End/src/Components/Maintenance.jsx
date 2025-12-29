// components/Maintenance.jsx
import React from "react";

const Maintenance = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "#f8f9fa",
      padding: "20px"
    }}>
      <h1>🚧 Website Under Maintenance</h1>
      <p>
        We are currently updating the website to improve your experience.
        <br />
        Please check back in some time.
      </p>
      <p style={{ marginTop: "10px", color: "#666" }}>
        Thank you for your patience 🙏
      </p>
    </div>
  );
};

export default Maintenance;

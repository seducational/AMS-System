import React from "react";
import { Container, Button } from "react-bootstrap";
import { Wrench, Clock, Mail } from "lucide-react";

const Maintenance = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #e4e9f2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "40px 30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6A38C2, #9B6BFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Wrench size={36} color="#fff" />
          </div>

          {/* Title */}
          <h2 style={{ fontWeight: 700, marginBottom: "10px" }}>
            We’re Upgrading Things 🚀
          </h2>

          {/* Message */}
          <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.6" }}>
            Our website is currently under maintenance to bring you a faster,
            smoother, and more reliable experience.
            <br />
            Please check back shortly.
          </p>

          {/* ETA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "20px",
              color: "#6A38C2",
              fontWeight: 500,
            }}
          >
            <Clock size={18} />
            <span>Expected to be back soon</span>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "30px",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
              fontSize: "14px",
              color: "#777",
            }}
          >
            Thank you for your patience 💜 <br />
            — Team AMS
          </div>

          {/* Optional contact */}
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ marginTop: "20px" }}
            onClick={() => window.location.href = "mailto:support@ams.com"}
          >
            <Mail size={14} className="me-1" />
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Maintenance;

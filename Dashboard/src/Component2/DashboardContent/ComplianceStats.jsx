import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplianceStats.css';

const ComplianceStats = () => {
  const [compliance, setCompliance] = useState({
    reservePolicy: 0,
    empiricalTherapy: 0,
    deEscalation: 0
  });

  const [fromDate, setFromDate] = useState('2025-07-01');
  const [toDate, setToDate] = useState('2025-07-31');

  const fetchCompliance = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/patient/compliance-stats?from=${fromDate}&to=${toDate}`);
      setCompliance(res.data);
    } catch (err) {
      console.error('Error fetching compliance stats:', err);
    }
  };

  useEffect(() => {
    fetchCompliance();
  }, [fromDate, toDate]);

  return (
    <div className="compliance-container">
      {/* <h2>📋 Compliance Metrics</h2> */}

      <div className="date-filters">
        <div className="form-group">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="compliance-grid">
        <div className="compliance-card reserve">
          <h4>Reserve Drug Policy Followed</h4>
          <p>{compliance.reservePolicy}%</p>
        </div>
        <div className="compliance-card empirical">
          <h4>Empirical Therapy Given</h4>
          <p>{compliance.empiricalTherapy}%</p>
        </div>
        <div className="compliance-card deescalation">
          <h4>De-escalation Done</h4>
          <p>{compliance.deEscalation}%</p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStats;

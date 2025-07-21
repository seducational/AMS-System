import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './InfectionPieChart.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InfectionPieChart = () => {
  const [infectionData, setInfectionData] = useState({
    MDRO: 0,
    VRE: 0,
    MRSA: 0,
  });

  const [fromDate, setFromDate] = useState('2025-07-01');
  const [toDate, setToDate] = useState('2025-07-31');

  const fetchInfectionData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/patient/infection-stats?from=${fromDate}&to=${toDate}`);
      setInfectionData(response.data);
    } catch (error) {
      console.error('Error fetching infection stats:', error);
    }
  };

  useEffect(() => {
    fetchInfectionData();
  }, [fromDate, toDate]);

  const data = {
    labels: ['MDRO', 'VRE', 'MRSA'],
    datasets: [
      {
        label: 'Infection Count',
        data: [infectionData.MDRO, infectionData.VRE, infectionData.MRSA],
        backgroundColor: ['#4B49AC', '#1BCFB4', '#F95F53'],
        borderColor: ['#ffffff'],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="chart-container">
      <div className="chart-card lg6">
        {/* <h2>🧫 Infection Type Distribution</h2> */}

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

        <div className="pie-wrapper">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default InfectionPieChart;

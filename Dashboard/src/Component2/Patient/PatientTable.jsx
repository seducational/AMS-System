import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spinner, Alert, Container } from "react-bootstrap";
import * as XLSX from "xlsx";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 Added state for search

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}patient/getPatient`);
        const data = await res.json();
        setPatients(data.reverse());
      } catch (err) {
        setError("Failed to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const exportToExcel = () => {
    const exportData = patients.map((p) => ({
      UHID: p.UHID,
      Age: p.Age,
      Sex: p.Sex,
      Indication: p.Indication,
      Diagnosis: p.Diagnosis,
      Past_History: p.Past_History,
      Co_morbidities: p.Co_morbidities,
      Empirical_Therapy: p.Empirical_Therapy,
      Antibiotic_name: p.Antibiotic_name,
      Dose: p.Dose,
      Route: p.Route,
      Frequency: p.Frequency,
      Started_Date: new Date(p.Started_Date).toLocaleDateString(),
      End_Date: new Date(p.End_Date).toLocaleDateString(),
      Duration: p.Duration,
      Culture_sent_before_start: p.Culture_sent_before_start ? "Yes" : "No",
      Specimen: p.Specimen,
      Antibiotic_change_afer_culture: p.Antibiotic_change_afer_culture,
      Antibiotic_name1: p.Antibiotic_name1,
      Dose1: p.Dose1,
      Route1: p.Route1,
      Frequency1: p.Frequency1,
      Antibiotic_review: p.Antibiotic_review,
      De_escalation: p.De_escalation,
      Is_Antibiotic_reserved: p.Is_Antibiotic_reserved,
      Reserve_drug_policy_followed: p.Reserve_drug_policy_followed,
      Selection_as_per_policy: p.Selection_as_per_policy,
      Policy_compliance: p.Policy_compliance,
      MDRO: p.MDRO,
      VRE: p.VRE,
      MRSA: p.MRSA,
      Remarks: p.Remarks
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Patient Data");

    XLSX.writeFile(workbook, "FullPatientData.xlsx");
  };

  const printTable = () => {
    window.print();
  };

  const filteredPatients = patients.filter((patient) =>
    String(patient.UHID).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-4">
      <h3 className="mb-4 text-center">🧾 Patient Records</h3>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
  {/* 🔍 Modern Search Bar */}
  <div className="input-group shadow-sm" style={{ maxWidth: "300px" }}>
    <span className="input-group-text bg-white border-end-0">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="text"
      className="form-control border-start-0 rounded-end"
      placeholder="Search UHID..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Buttons */}
  <div className="d-flex gap-2">
    <Button variant="success" onClick={exportToExcel}>
      Export to Excel
    </Button>
    <Button variant="secondary" onClick={printTable}>
      Print
    </Button>
  </div>
</div>


      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>UHID</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Started Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.UHID}</td>
                <td>{patient.Age}</td>
                <td>{patient.Sex}</td>
                <td>{new Date(patient.Started_Date).toLocaleDateString()}</td>
                <td>{new Date(patient.End_Date).toLocaleDateString()}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleView(patient)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for full details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient ? (
            <Table bordered responsive>
              <tbody>
                <tr><th>UHID</th><td>{selectedPatient.UHID}</td></tr>
                <tr><th>Age</th><td>{selectedPatient.Age}</td></tr>
                <tr><th>Sex</th><td>{selectedPatient.Sex}</td></tr>
                <tr><th>Indication</th><td>{selectedPatient.Indication}</td></tr>
                <tr><th>Diagnosis</th><td>{selectedPatient.Diagnosis}</td></tr>
                <tr><th>Past History</th><td>{selectedPatient.Past_History}</td></tr>
                <tr><th>Comorbidities</th><td>{selectedPatient.Co_morbidities}</td></tr>
                <tr><th>Empirical Therapy</th><td>{selectedPatient.Empirical_Therapy}</td></tr>
                <tr><th>Antibiotic Name</th><td>{selectedPatient.Antibiotic_name}</td></tr>
                <tr><th>Dose</th><td>{selectedPatient.Dose}</td></tr>
                <tr><th>Route</th><td>{selectedPatient.Route}</td></tr>
                <tr><th>Frequency</th><td>{selectedPatient.Frequency}</td></tr>
                <tr><th>Started Date</th><td>{new Date(selectedPatient.Started_Date).toLocaleDateString()}</td></tr>
                <tr><th>End Date</th><td>{new Date(selectedPatient.End_Date).toLocaleDateString()}</td></tr>
                <tr><th>Duration</th><td>{selectedPatient.Duration}</td></tr>
                <tr><th>Culture Sent Before Start</th><td>{selectedPatient.Culture_sent_before_start ? "Yes" : "No"}</td></tr>
                <tr><th>Specimen</th><td>{selectedPatient.Specimen}</td></tr>
                <tr><th>Antibiotic Changed After Culture</th><td>{selectedPatient.Antibiotic_change_afer_culture}</td></tr>
                <tr><th>New Antibiotic Name</th><td>{selectedPatient.Antibiotic_name1}</td></tr>
                <tr><th>New Dose</th><td>{selectedPatient.Dose1}</td></tr>
                <tr><th>New Route</th><td>{selectedPatient.Route1}</td></tr>
                <tr><th>New Frequency</th><td>{selectedPatient.Frequency1}</td></tr>
                <tr><th>Antibiotic Review</th><td>{selectedPatient.Antibiotic_review}</td></tr>
                <tr><th>De-escalation</th><td>{selectedPatient.De_escalation}</td></tr>
                <tr><th>Is Antibiotic Reserved</th><td>{selectedPatient.Is_Antibiotic_reserved}</td></tr>
                <tr><th>Reserve Drug Policy Followed</th><td>{selectedPatient.Reserve_drug_policy_followed}</td></tr>
                <tr><th>Selection as per Policy</th><td>{selectedPatient.Selection_as_per_policy}</td></tr>
                <tr><th>Policy Compliance</th><td>{selectedPatient.Policy_compliance}</td></tr>
                <tr><th>MDRO</th><td>{selectedPatient.MDRO}</td></tr>
                <tr><th>VRE</th><td>{selectedPatient.VRE}</td></tr>
                <tr><th>MRSA</th><td>{selectedPatient.MRSA}</td></tr>
                <tr><th>Remarks</th><td>{selectedPatient.Remarks}</td></tr>
              </tbody>
            </Table>
          ) : (
            <p>No data available.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PatientTable;

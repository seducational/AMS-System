import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Image,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaStar, FaUserPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom';
import AuditFormPage1 from "./AuditFormPage1";
import AuditFormPage2 from "./AuditFormPage2";
import { FaEye } from "react-icons/fa";
import axios from "axios";

const PatientDataComponent = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [changedAfterCulture, setChangedAfterCulture] = useState("Select-");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //New Data

  const [patients, setPatients] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("${import.meta.env.VITE_BACKEND_URL}/patient/getPatient"); // 🔁 Change this if different route
        const data = await res.json();
        setPatients(data.reverse()); // latest on top
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
      infectionType: p.infectionType,
      Remarks: p.Remarks,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Patient Data");

    XLSX.writeFile(workbook, "FullPatientData.xlsx");
  };

  const printTable = () => {
    window.print();
  };

  //end Here

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const resetForm = () => {
    setFormData({});
    setChangedAfterCulture("Select-");
    setPage(1);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (key === "Antibiotic_change_afer_culture") {
      setChangedAfterCulture(value);
    }
  };

  //Validation for form submission
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.UHID) newErrors.UHID = "UHID is required.";
    if (!formData.Age) newErrors.Age = "Age is required.";
    if (!formData.Sex) newErrors.Sex = "Sex is required.";
    if (!formData.Indication) newErrors.Indication = "Indication is required.";
    if (!formData.Diagnosis) newErrors.Diagnosis = "Diagnosis is required.";
    if (!formData.Past_History)
      newErrors.Past_History = "Past history is required.";
    if (formData.Past_History === "Yes" && !formData.Co_morbidities)
      newErrors.Co_morbidities = "Co-morbidities are required.";
    if (!formData.Empirical_Therapy)
      newErrors.Empirical_Therapy = "Empirical therapy is required.";
    if (!formData.Antibiotic_name)
      newErrors.Antibiotic_name = "Antibiotic name is required.";
    if (!formData.Dose) newErrors.Dose = "Dose is required.";
    if (!formData.Route) newErrors.Route = "Route is required.";
    if (!formData.Frequency) newErrors.Frequency = "Frequency is required.";
    if (!formData.Started_Date)
      newErrors.Started_Date = "Started Date is required.";
    if (!formData.End_Date) newErrors.End_Date = "End Date is required.";
    if (
      formData.Culture_sent_before_start === undefined ||
      formData.Culture_sent_before_start === ""
    )
      newErrors.Culture_sent_before_start = "Culture before start is required.";
    if (!formData.Specimen) newErrors.Specimen = "Specimen is required.";
    if (!formData.Antibiotic_change_afer_culture)
      newErrors.Antibiotic_change_afer_culture = "This field is required.";
    if (!formData.Antibiotic_review)
      newErrors.Antibiotic_review = "Antibiotic review is required.";
    if (!formData.De_escalation)
      newErrors.De_escalation = "De-escalation field is required.";
    if (!formData.Is_Antibiotic_reserved)
      newErrors.Is_Antibiotic_reserved = "This field is required.";
    if (!formData.Reserve_drug_policy_followed)
      newErrors.Reserve_drug_policy_followed = "This field is required.";
    if (!formData.Selection_as_per_policy)
      newErrors.Selection_as_per_policy = "This field is required.";
    if (!formData.Policy_compliance)
      newErrors.Policy_compliance = "Policy compliance is required.";
    if (!formData.infectionType)
      newErrors.infectionType = "Infection type is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(formData); // 👈 Get errors
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // 👈 Show field-wise errors
      alert("Please fill all required fields.\nFailed to submit form.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "${import.meta.env.VITE_BACKEND_URL}/patient/add",
        formData
      );
      alert("Form submitted successfully!");
      console.log("Response:", response.data);
      resetForm();
      setShow(false);
      setPage(1);
      setErrors({}); // 👈 Clear previous errors after success
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during submission.");
    }

    setLoading(false);
  };

  return (
    <>
      <Container className="my-4">
        <h3 className="mb-4 text-center">🧾 Patient Records</h3>
        <div className="d-flex justify-content-end mb-3 gap-2">
          <Button
            variant="primary"
            className="d-flex justify-content-center align-items-center gap-2"
            onClick={() => setShow(true)}
          >
            <FaUserPlus />
            Add Patient
          </Button>
          <Button variant="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <Button variant="secondary" onClick={printTable}>
            Print
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
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
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.UHID}</td>
                  <td>{patient.Age}</td>
                  <td>{patient.Sex}</td>
                  <td>{new Date(patient.Started_Date).toLocaleDateString()}</td>
                  <td>{new Date(patient.End_Date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleView(patient)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal for full details */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPatient ? (
              <Table bordered responsive>
                <tbody>
                  <tr>
                    <th>UHID</th>
                    <td>{selectedPatient.UHID}</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{selectedPatient.Age}</td>
                  </tr>
                  <tr>
                    <th>Sex</th>
                    <td>{selectedPatient.Sex}</td>
                  </tr>
                  <tr>
                    <th>Indication</th>
                    <td>{selectedPatient.Indication}</td>
                  </tr>
                  <tr>
                    <th>Diagnosis</th>
                    <td>{selectedPatient.Diagnosis}</td>
                  </tr>
                  <tr>
                    <th>Past History</th>
                    <td>{selectedPatient.Past_History}</td>
                  </tr>
                  <tr>
                    <th>Comorbidities</th>
                    <td>
                      {selectedPatient.Co_morbidities
                        ? selectedPatient.Co_morbidities
                        : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>Empirical Therapy</th>
                    <td>{selectedPatient.Empirical_Therapy}</td>
                  </tr>
                  <tr>
                    <th>Antibiotic Name</th>
                    <td>{selectedPatient.Antibiotic_name}</td>
                  </tr>
                  <tr>
                    <th>Dose</th>
                    <td>{selectedPatient.Dose}</td>
                  </tr>
                  <tr>
                    <th>Route</th>
                    <td>{selectedPatient.Route}</td>
                  </tr>
                  <tr>
                    <th>Frequency</th>
                    <td>{selectedPatient.Frequency}</td>
                  </tr>
                  <tr>
                    <th>Started Date</th>
                    <td>
                      {new Date(
                        selectedPatient.Started_Date
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <th>End Date</th>
                    <td>
                      {new Date(selectedPatient.End_Date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>{selectedPatient.Duration}</td>
                  </tr>
                  <tr>
                    <th>Culture Sent Before Start</th>
                    <td>
                      {selectedPatient.Culture_sent_before_start ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <th>Specimen</th>
                    <td>{selectedPatient.Specimen}</td>
                  </tr>

                  {/* Second Page Data */}
                  <tr>
                    <th>Antibiotic Changed After Culture</th>
                    <td>{selectedPatient.Antibiotic_change_afer_culture}</td>
                  </tr>
                  <tr>
                    <th>New Antibiotic Name</th>
                    <td>
                      {selectedPatient.Antibiotic_name1
                        ? selectedPatient.Antibiotic_name1
                        : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>New Dose</th>
                    <td>
                      {selectedPatient.Dose1 ? selectedPatient.Dose1 : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>New Route</th>
                    <td>
                      {selectedPatient.Route1 ? selectedPatient.Route1 : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>New Frequency</th>
                    <td>
                      {selectedPatient.Frequency1
                        ? selectedPatient.Frequency1
                        : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>Antibiotic Review</th>
                    <td>{selectedPatient.Antibiotic_review}</td>
                  </tr>
                  <tr>
                    <th>De-escalation</th>
                    <td>{selectedPatient.De_escalation}</td>
                  </tr>
                  <tr>
                    <th>Is Antibiotic Reserved</th>
                    <td>{selectedPatient.Is_Antibiotic_reserved}</td>
                  </tr>
                  <tr>
                    <th>Reserve Drug Policy Followed</th>
                    <td>{selectedPatient.Reserve_drug_policy_followed}</td>
                  </tr>
                  <tr>
                    <th>Selection as per Policy</th>
                    <td>{selectedPatient.Selection_as_per_policy}</td>
                  </tr>
                  <tr>
                    <th>Policy Compliance</th>
                    <td>{selectedPatient.Policy_compliance}</td>
                  </tr>
                  <tr>
                    <th>Infection Type</th>
                    <td>
                      {selectedPatient.infectionType
                        ? selectedPatient.infectionType
                        : "🚫"}
                    </td>
                  </tr>
                  <tr>
                    <th>Remarks</th>
                    <td>
                      {selectedPatient.Remarks ? selectedPatient.Remarks : "🚫"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>No data available.</p>
            )}
          </Modal.Body>
        </Modal>
      </Container>
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Antibiotic Prescription Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {page === 1 && (
            <AuditFormPage1 formData={formData} handleChange={handleChange} setFormData={setFormData} errors={errors} />
          )}
          {page === 2 && (
            <AuditFormPage2 formData={formData} handleChange={handleChange} changedAfterCulture={formData.Antibiotic_change_afer_culture} errors={errors} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={resetForm} className="me-auto">
            Clear Form
          </Button>
          {page > 1 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {page < 2 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientDataComponent;

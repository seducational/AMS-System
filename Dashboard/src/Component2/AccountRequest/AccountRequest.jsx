import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

const AccountRequests = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/auth/pending-requests");
      setPendingUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    Swal.fire({
      title: 'Approve User?',
      text: 'Are you sure you want to approve this user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8000/auth/approve-user/${id}`);
          setMessage("User approved successfully!");
          fetchPendingUsers();
          Swal.fire('Approved!', 'The user has been approved.', 'success');
        } catch (error) {
          console.error("Error approving user:", error);
          Swal.fire('Oops!', 'Something went wrong while approving.', 'error');
        }
      }
    });
  };

  const rejectUser = async (id) => {
    Swal.fire({
      title: 'Reject User?',
      text: 'This will delete the user permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/auth/reject-user/${id}`);
          setMessage("User rejected and deleted!");
          fetchPendingUsers();
          Swal.fire('Rejected!', 'The user has been deleted.', 'success');
        } catch (error) {
          console.error("Error rejecting user:", error);
          Swal.fire('Oops!', 'Something went wrong while rejecting.', 'error');
        }
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h3>Pending Account Requests</h3>
        </Col>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={fetchPendingUsers}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </Col>
      </Row>

      {message && (
        <Alert variant="info" onClose={() => setMessage(null)} dismissible>
          {message}
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : pendingUsers.length === 0 ? (
        <Alert variant="success">No pending requests</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{`${user.firstName} ${user.middleName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => approveUser(user._id)}
                    className="me-2"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => rejectUser(user._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AccountRequests;

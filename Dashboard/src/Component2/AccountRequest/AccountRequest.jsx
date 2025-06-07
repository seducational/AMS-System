import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const AccountRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch pending requests from backend
  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get(
            'http://localhost:8000/request/admin/account-requests',

            {
                headers: {
                    'x-auth-token': localStorage.getItem('authToken')
                  }
            });
      setRequests(response.data.requests); // assume backend sends { requests: [...] }
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };
  console.log("Stored Token:", localStorage.getItem('authToken'));
  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle accept or reject
  const handleAction = async (userId, action) => {
    setActionLoading(true);
    try {
      const url = action === 'accept'
        ? `http://localhost:8000/request/admin/approve-requests/${userId}`
        : 'http://localhost:8000/request/admin/reject-requests';
  
      let payload = { id: userId };
  
      if (action === 'accept') {
        const password = window.prompt("Enter a password for this user:");
        if (!password) {
          alert("Password is required to approve the request.");
          setActionLoading(false);
          return;
        }
        payload.password = password;
      }
  
      await axios.post(url, payload, {
        headers: {
          'x-auth-token': localStorage.getItem('authToken')
        }
      });
  
      alert(`Request ${action}ed successfully`);
      fetchRequests(); // Refresh list
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update request');
    } finally {
      setActionLoading(false);
    }
  };
  
  

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h3>Pending Account Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.firstName} {req.middleName} {req.lastName}</td>
                <td>{req.email}</td>
                <td>{req.userType}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    disabled={actionLoading}
                    onClick={() => handleAction(req._id, 'accept')}
                    className="me-2"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={actionLoading}
                    onClick={() => handleAction(req._id, 'reject')}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AccountRequest;

import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/notify/getNotification');
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="text-center text-md-start">🔔 Notifications</h2>
        </Col>
        <Col className="text-end">
        <Button variant="outline-primary" onClick={fetchNotifications}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : notifications.length === 0 ? (
        <Alert variant="info">No notifications to show.</Alert>
      ) : (
        notifications.map((n) => (
          <Card key={n._id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{n.title}</Card.Title>
              <Card.Text>{n.message}</Card.Text>
              <Card.Footer className="text-muted text-end" style={{ fontSize: '0.85rem' }}>
                {new Date(n.createdAt).toLocaleString()}
              </Card.Footer>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default NotificationsList;

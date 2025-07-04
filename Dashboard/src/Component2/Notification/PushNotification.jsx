import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

const PushNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8000/notify/postNotification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      if (res.ok) {
        setSuccess('✅ Notification sent successfully!');
        setTitle('');
        setMessage('');
      } else {
        setSuccess('❌ Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setSuccess('❌ Error occurred while sending.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">📤 Send Notification</h2>

      {success && <Alert variant={success.startsWith('✅') ? 'success' : 'danger'}>{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? <Spinner animation="border" size="sm" /> : 'Send Notification'}
        </Button>
      </Form>
    </Container>
  );
};

export default PushNotification;

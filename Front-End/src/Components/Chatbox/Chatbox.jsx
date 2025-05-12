// AMS Chatbox UI using React Bootstrap (Enhanced with animations and styling)

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Badge,
  Container,
} from "react-bootstrap";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatbox.css"; // External CSS for animations
import { useAuth } from '../../AuthContext'; 

const socket = io("http://localhost:8000/");

const Chatbox = () => {
  const { user } = useAuth(); // includes _id, name, role
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    socket.emit("join", user);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userTyping", (name) => {
      setTypingStatus(`${name} is typing...`);
      setTimeout(() => setTypingStatus(""), 2000);
    });

    socket.on("pinned", (msgId) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === msgId ? { ...msg, pinned: true } : msg))
      );
    });

    return () => socket.disconnect();
  }, [user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msg = {
      _id: Date.now().toString(),
      senderId: user._id,
      senderName: user.name,
      role: user.role,
      message: newMsg,
      timestamp: new Date(),
      room: "global",
      pinned: false,
      reactions: {},
    };
    socket.emit("sendMessage", msg);
    setNewMsg("");
  };

  const handlePin = (msgId) => {
    socket.emit("pinMessage", msgId);
  };

  const filteredMessages = messages.filter((msg) =>
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container className="mt-3 ">
        
        <Card className="p-4  animated-card chatbox-card">
          <h4 className="mb-3 text-primary fw-bold">AMS Pro Chatbox</h4>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search messages..."
              className="animated-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <div className="overflow-auto mb-3 chatbox-messages">
            <ListGroup>
              {filteredMessages.map((msg, idx) => (
                <ListGroup.Item key={idx} className="message-item">
                  <div className="d-flex justify-content-between">
                    <strong>
                      {msg.senderName} ({msg.role})
                    </strong>
                    {msg.pinned && <Badge bg="warning">📌</Badge>}
                  </div>
                  <div>{msg.message}</div>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="mt-2 animated-button"
                    onClick={() => handlePin(msg._id)}
                  >
                    Pin
                  </Button>
                </ListGroup.Item>
              ))}
              <div ref={endRef} />
            </ListGroup>
          </div>

          {typingStatus && (
            <div className="text-muted small mb-3 animated-typing">
              {typingStatus}
            </div>
          )}

          <InputGroup>
            <Form.Control
              placeholder="Type a message..."
              value={newMsg}
              className="animated-input"
              onChange={(e) => {
                setNewMsg(e.target.value);
                socket.emit("typing", user.name);
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              variant="success"
              className="animated-button"
              onClick={sendMessage}
            >
              Send
            </Button>
          </InputGroup>
        </Card>
      </Container>
    </>
  );
};

export default Chatbox;

// client/src/App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chatbox1.css";
import axios from "axios";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

function ChatBoxComponent() {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // ✅ Fetch logged-in user's full name + ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/me`, {
          headers: {
            "x-auth-token": token,
          },
        });

        const { _id, firstName, middleName, lastName } = res.data;
        const middleInitial = middleName ? `${middleName[0]}.` : "";
        const fullName = `${firstName} ${middleInitial} ${lastName}`.trim();

        setUsername(fullName);
        setUserId(_id);
        socket.emit("join", fullName);
        setJoined(true);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  // ✅ Load all public messages from DB
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/get-messages?isGroup=true`
        );
        const formatted = res.data.map((msg) => ({
          user: `${msg.sender.firstName}${
            msg.sender.userType === "admin" ? " (Admin)" : ""
          }`,
          text: msg.content,
        }));
        setChat(formatted);
      } catch (error) {
        console.error("Error loading chat history:", error.message);
      }
    };

    fetchMessages();
  }, []);

  // ✅ Listen to socket messages
  useEffect(() => {
    socket.on("message", (payload) => {
      let formattedUser = "";

      if (typeof payload.user === "object" && payload.user !== null) {
        const { firstName, middleName, lastName, userType } = payload.user;
        const middleInitial = middleName ? `${middleName[0]}.` : "";
        formattedUser = `${firstName} ${middleInitial} ${lastName}`.trim();
        if (userType === "admin") formattedUser += " (Admin)";
      } else {
        formattedUser = payload.user;
      }

      setChat((prevChat) => [
        ...prevChat,
        { user: formattedUser, text: payload.text },
      ]);
    });

    socket.on("userConnected", (name) => {
      setChat((prevChat) => [
        ...prevChat,
        { user: "System", text: `${name} has joined the chat` },
      ]);
    });

    socket.on("userDisconnected", (name) => {
      setChat((prevChat) => [
        ...prevChat,
        { user: "System", text: `${name} has left the chat` },
      ]);
    });

    return () => socket.off();
  }, []);

  // ✅ Send message to socket + DB
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      socket.emit("message", { user: username, text: message });

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/send-message`, {
        senderId: userId,
        content: message,
        isGroup: true,
      });

      setMessage("");
    } catch (err) {
      console.error("Message not sent:", err.message);
    }
  };

  if (!joined)
    return (
      <div className="justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );

  return (
    <div className="main-chat-container">
      <div className="sidebar">
        <h3>Public Chat</h3>
        <p className="text-muted">Everyone sees this chat</p>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h3>Public Chat Room</h3>
        </div>
        <div className="chat-messages">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.user === username ? "own" : ""}`}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBoxComponent;

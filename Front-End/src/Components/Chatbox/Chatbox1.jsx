// client/src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chatbox1.css';

const socket = io('http://localhost:8000');

function ChatBoxComponent() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [activeChatUser, setActiveChatUser] = useState(null);

  useEffect(() => {
    socket.on('message', (payload) => {
      setChat((prevChat) => [...prevChat, payload]);

      if (payload.user !== username && payload.user !== activeChatUser) {
        setUnreadCounts((prev) => ({
          ...prev,
          [payload.user]: (prev[payload.user] || 0) + 1,
        }));
      }
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    socket.on('userConnected', (username) => {
      setChat((prevChat) => [
        ...prevChat,
        { user: 'System', text: `${username} has joined the chat` },
      ]);
    });

    socket.on('userDisconnected', (username) => {
      setChat((prevChat) => [
        ...prevChat,
        { user: 'System', text: `${username} has left the chat` },
      ]);
    });

    return () => {
      socket.off();
    };
  }, [username, activeChatUser]);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit('join', username);
      setJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  const handleUserClick = (user) => {
    setActiveChatUser(user);
    setUnreadCounts((prev) => ({ ...prev, [user]: 0 }));
  };

  const filteredChat = activeChatUser
    ? chat.filter((msg) => msg.user === activeChatUser || msg.user === username || msg.user === 'System')
    : chat;

  if (!joined) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <h2>Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-chat-container">
      <div className="sidebar">
        <h3>Users</h3>
        <ul className="user-list">
          {users
            .filter((u) => u !== username)
            .map((user, idx) => (
              <li
                key={idx}
                className={user === activeChatUser ? 'active-user' : ''}
                onClick={() => handleUserClick(user)}
              >
                {user}
                {unreadCounts[user] > 0 && (
                  <span className="badge">{unreadCounts[user]}</span>
                )}
              </li>
            ))}
        </ul>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h3>{activeChatUser ? `Chat with ${activeChatUser}` : 'Public Chat Room'}</h3>
        </div>
        <div className="chat-messages">
          {filteredChat.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.user === username ? 'own' : ''}`}
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

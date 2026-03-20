import React, { useEffect, useState } from "react";
import { connectSocket } from "./socket";
import API from "./api";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    Notification.requestPermission();

    const s = connectSocket(user, (msg) => {
      setMessages(prev => [...prev, { ...msg, self: false, seen: false }]);

      if (Notification.permission === "granted") {
        new Notification(`New message from ${msg.from}`, { body: msg.content });
      }
    });

    setSocket(s);

    // Load persisted chat history from backend
    (async () => {
      try {
        const response = await API.get('/chat/messages');
        if (response.data && response.data.messages) {
          setMessages(response.data.messages.map(m => ({
            content: m.content,
            self: m.sender === user,
            from: m.sender,
            to: m.receiver,
            seen: m.sender === user
          })));
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    })();

    return () => s.close();
  }, [user]);

  const send = async () => {
    if (!receiver || !text) return;

    const newMsg = { from: user, to: receiver, content: text, self: true, seen: false };
    setMessages(prev => [...prev, newMsg]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ receiver, content: text }));
    } else {
      console.warn('WebSocket not open yet, delaying send');
      const waitUntilOpen = () => new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
          if (!socket) return reject(new Error('WebSocket missing'));
          if (socket.readyState === WebSocket.OPEN) return resolve();
          if (Date.now() - start > 5000) return reject(new Error('WebSocket open timeout'));
          setTimeout(check, 50);
        };
        check();
      });

      try {
        await waitUntilOpen();
        socket.send(JSON.stringify({ receiver, content: text }));
      } catch (error) {
        console.error('WebSocket did not open in time:', error);
      }
    }

    try {
      await API.post('/chat/send', { sender: user, receiver, content: text });
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    setText("");
  };

  const markSeen = (msgIndex) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[msgIndex].seen = true;
      return updated;
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: 250, background: "#1e1e2f", color: "white", padding: 20 }}>
        <h3>{user}</h3>
        <input 
          placeholder="Receiver" 
          value={receiver} 
          onChange={e => setReceiver(e.target.value)} 
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />
        <h4>Online Users</h4>
        <ul>
          {Object.entries(onlineUsers).map(([username, status]) => (
            <li key={username} style={{ color: status ? "lime" : "gray" }}>
              {username} ({status ? "Online" : "Offline"})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
          {messages.map((m, i) => (
            <div 
              key={i} 
              style={{ textAlign: m.self ? "right" : "left", margin: 5, position: "relative" }}
              onMouseEnter={() => !m.self && !m.seen && markSeen(i)}
            >
              <span style={{ 
                background: m.self ? "#4caf50" : "#ddd", 
                padding: 10, 
                borderRadius: 10,
                display: "inline-block",
                maxWidth: "70%"
              }}>
                {m.content}
              </span>
              {m.self && (
                <span style={{ fontSize: 10, marginLeft: 5 }}>
                  {m.seen ? "✔✔ seen" : "✔ delivered"}
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <input 
            style={{ flex: 1, padding: 10 }} 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Type a message..."
            onKeyDown={e => { if (e.key === "Enter") send(); }}
          />
          <button onClick={send} style={{ padding: 10, background: "#4caf50", color: "white", border: "none" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
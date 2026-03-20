import React, { useState } from "react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");

  const handleLogin = (name) => {
    if (name.trim()) {
      localStorage.setItem("username", name);
      setUser(name);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login</h2>
      <input 
        placeholder="Username" 
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleLogin(username); }}
      />
      <button onClick={() => handleLogin(username)}>Enter</button>
    </div>
  );
}
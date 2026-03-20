import React, { useState } from "react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login</h2>
      <input 
        placeholder="Username" 
        value={username}
        onChange={e => setUsername(e.target.value)} 
      />
      <button onClick={() => setUser(username)}>Enter</button>
    </div>
  );
}
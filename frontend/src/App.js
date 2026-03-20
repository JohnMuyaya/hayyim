import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return user ? <Chat user={user} /> : <Login setUser={setUser} />;
}

export default App;
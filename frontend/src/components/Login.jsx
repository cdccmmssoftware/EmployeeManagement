import { useState } from "react";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      window.location = "/employees";
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div class="login-container">
      <h1>Admin Login</h1>

      <h4>Username :</h4>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      

      <h4>Password :</h4>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;
// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPage({ setCurrentUser }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const { data } = await API.post("/users/register", {
          username,
          email,
          password,
        });
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        const { data } = await API.post("/users/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        alert("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegister && (
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p style={styles.toggleText}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span style={styles.link} onClick={toggleMode}>
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#065fd4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  toggleText: {
    marginTop: "1rem",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

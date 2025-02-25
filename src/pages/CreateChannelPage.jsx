// src/pages/CreateChannelPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreateChannelPage({ setCurrentUser }) {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setErrorMsg("You must be logged in to create a channel.");
        return;
      }

      // POST channel data to backend
      const { data } = await API.post("/channels", {
        channelName,
        owner: user._id,
        description,
        channelBanner,
      });

      // Update the user's channelId in localStorage and shared state
      const updatedUser = { ...user, channelId: data._id };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      setSuccessMsg("Channel created successfully!");
      // Navigate to the channel page after creation
      navigate(`/channel/${data._id}`);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Something went wrong creating channel."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Your Channel</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Channel Banner URL"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Channel Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Create Channel
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
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
  textarea: {
    padding: "0.5rem",
    fontSize: "1rem",
    minHeight: "80px",
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
};

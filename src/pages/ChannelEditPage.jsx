// src/pages/ChannelEditPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ChannelEditPage({ currentUser }) {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [channelLogo, setChannelLogo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Fetch channel data to pre-fill the form
    const fetchChannel = async () => {
      try {
        const { data } = await API.get(`/channels/${channelId}`);
        // Optional: check if currentUser._id === data.owner
        setChannelName(data.channelName || "");
        setDescription(data.description || "");
        setChannelBanner(data.channelBanner || "");
        setChannelLogo(data.channelLogo || "");
      } catch (err) {
        console.error(err);
        setErrorMsg("Error loading channel data.");
      }
    };
    fetchChannel();
  }, [channelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/channels/${channelId}`, {
        channelName,
        description,
        channelBanner,
        channelLogo,
      });
      setSuccessMsg("Channel updated successfully!");
      // Optionally navigate back to channel page
      navigate(`/channel/${channelId}`);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error updating channel.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Channel</h2>
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
        <input
          style={styles.input}
          type="text"
          placeholder="Channel Logo URL"
          value={channelLogo}
          onChange={(e) => setChannelLogo(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Channel Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Update Channel
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

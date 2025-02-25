// src/pages/UploadVideoPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function UploadVideoPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other"); // <-- new state
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setErrorMsg("Please sign in to upload a video.");
        return;
      }
      const channelId = user.channelId || "defaultChannelId";

      const { data } = await API.post("/videos", {
        title,
        thumbnailUrl,
        description,
        channelId,
        uploader: user._id,
        videoUrl,
        category // <-- send category
      });

      console.log("Uploaded Video:", data);
      setSuccessMsg("Video uploaded successfully!");
      setTitle("");
      setThumbnailUrl("");
      setVideoUrl("");
      setDescription("");
      setCategory("Other");
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Something went wrong uploading video."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Video</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Video Link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Category dropdown */}
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
          <option value="Education">Education</option>
          <option value="Movies">Movies</option>
          <option value="News">News</option>
          <option value="Sports">Sports</option>
          <option value="Live">Live</option>
          <option value="Comedy">Comedy</option>
          <option value="Other">Other</option>
        </select>
        <button style={styles.button} type="submit">
          Upload
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
  select: {
    padding: "0.4rem",
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
};

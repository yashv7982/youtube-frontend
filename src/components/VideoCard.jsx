// src/components/VideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

function VideoCard({ video, small = false }) {
  const {
    _id,
    videoId,
    title,
    thumbnailUrl,
    channelName, // Make sure your backend returns channelName
    views,
    // uploadDate, // We won't display this
  } = video;

  // If your backend doesn't provide channelName, you'd fetch it or store it in the video object
  // For the link, use videoId if you have it, otherwise use _id
  const linkId = videoId || _id;

  const cardClass = small ? "video-card small" : "video-card";

  return (
    <Link to={`/video/${linkId}`} className="video-link">
      <div className={cardClass}>
        <div className="thumbnail-container">
          <img src={thumbnailUrl} alt={title} />
        </div>
        <div className="video-details">
          <div className="video-info">
            <h3 className="video-title">{title}</h3>
            <div className="video-channel">{channelName}</div>
            <div className="video-stats">{views} views</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

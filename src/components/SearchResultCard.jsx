// src/components/SearchResultCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SearchResultCard.css";

function SearchResultCard({ video }) {
  const {
    videoId,
    thumbnailUrl,
    title,
    channelId,
    channelLogo,
    views,
    uploadDate,
    description,
  } = video;

  return (
    <Link to={`/video/${videoId}`} className="search-result-link">
      <div className="search-result-card">
        <div className="search-result-thumbnail">
          <img src={thumbnailUrl} alt={title} />
        </div>
        <div className="search-result-info">
          <h3 className="search-result-title">{title}</h3>
          <div className="search-result-channel">
            {channelLogo && (
              <img
                src={channelLogo}
                alt={channelId}
                className="search-channel-logo"
              />
            )}
            <span>{channelId}</span>
          </div>
          <div className="search-result-stats">
            {views} views • {new Date(uploadDate).toLocaleDateString()}
          </div>
          <p className="search-result-description">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;

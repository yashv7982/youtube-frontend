// src/pages/ChannelPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import VideoCard from "../components/VideoCard";
import "./ChannelPage.css";

export default function ChannelPage({ currentUser }) {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const { data } = await API.get(`/channels/${channelId}`);
        setChannel(data);
      } catch (err) {
        setError("Error fetching channel data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [channelId]);

  if (loading) return <div>Loading channel...</div>;
  if (error) return <div>{error}</div>;
  if (!channel) return <div>No channel found.</div>;

  const isOwner = currentUser && currentUser._id === channel.owner;

  return (
    <div className="channel-page">
      {/* Channel Banner */}
      <div className="channel-banner">
        {channel.channelBanner && <img src={channel.channelBanner} alt="Banner" />}
      </div>

      {/* Channel Info */}
      <div className="channel-info">
        <div className="channel-logo-name">
          {channel.channelLogo && (
            <img src={channel.channelLogo} alt="Channel Logo" className="channel-logo" />
          )}
          <h2>{channel.channelName}</h2>
        </div>
        <p>{channel.description}</p>
        <p>{channel.subscribers} subscribers</p>

        {isOwner && (
          <Link to={`/channel/${channelId}/edit`} className="edit-channel-button">
            Edit Channel
          </Link>
        )}
      </div>

      <hr />

      {/* Channel Videos */}
      <div className="channel-videos">
        <h3>Videos</h3>
        <div className="channel-videos-grid">
          {channel.videos && channel.videos.length > 0 ? (
            channel.videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))
          ) : (
            <p>No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

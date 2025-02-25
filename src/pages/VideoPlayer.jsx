// src/pages/VideoPlayer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import VideoCard from "../components/VideoCard";
import CommentsSection from "../components/CommentsSection";
import "./VideoPlayer.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiShare } from "react-icons/bi";

// Helper: convert YouTube watch link to embed link
const getYouTubeEmbedUrl = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default function VideoPlayer({ currentUser }) {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await API.get(`/videos/${videoId}`);
        setVideo(data);
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        // Filter out the current video
        setRecommendedVideos(data.filter((v) => v._id !== videoId));
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };
    fetchVideos();
  }, [videoId]);

  if (!video) {
    return <div className="video-player-container">Loading...</div>;
  }

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl || "");
  const isYouTubeVideo = Boolean(embedUrl);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);
  const handleSubscribe = () => setSubscribed((prev) => !prev);

  return (
    <div className="video-player-container">
      <div className="main-video-section">
        {isYouTubeVideo ? (
          <div className="video-iframe-container">
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video controls className="video-element">
            <source
              src={video.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
        )}

        <h2 className="vp-title">{video.title}</h2>
        <div className="vp-meta-row">
          <div className="vp-meta-left">
            <span>
              {video.views} views •{" "}
              {new Date(video.uploadDate).toLocaleDateString()}
            </span>
          </div>
          <div className="vp-meta-right">
            <button className="vp-btn like-btn" onClick={handleLike}>
              <AiOutlineLike /> {likes}
            </button>
            <button className="vp-btn dislike-btn" onClick={handleDislike}>
              <AiOutlineDislike /> {dislikes}
            </button>
            <button className="vp-btn share-btn">
              <BiShare /> Share
            </button>
          </div>
        </div>
        <hr />
        {/* 
            Show channel logo (video.channelLogo) and name (video.channelName)
            which we stored in the video doc on creation 
        */}
        <div className="vp-channel-row">
          <img
            src={video.channelLogo || "https://via.placeholder.com/48?text=Channel"}
            alt={video.channelName || "Channel"}
            className="vp-channel-logo"
          />
          <div className="vp-channel-info">
            <h4 className="vp-channel-name">
              {video.channelName || "Unknown Channel"}
            </h4>
            <p className="vp-channel-subscribers">1.2M subscribers</p>
          </div>
          <button
            className={`vp-btn subscribe-btn ${subscribed ? "subscribed" : ""}`}
            onClick={handleSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="vp-description">
          <p>
            <strong>Description:</strong> {video.description}
          </p>
        </div>

        {/* Comments Section - pass currentUser for user avatar in comments */}
        <CommentsSection videoId={video._id} currentUser={currentUser} />
      </div>

      <div className="recommended-section">
        <h3 className="up-next-title">Up Next</h3>
        {recommendedVideos.map((vid) => (
          <VideoCard key={vid._id} video={vid} small />
        ))}
      </div>
    </div>
  );
}

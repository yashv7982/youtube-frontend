import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import {
  MdOutlineSmartDisplay,
  MdSubscriptions,
  MdHistory,
  MdVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // Prevent closing when clicking inside the sidebar
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  // Navigate to home and then close sidebar
  const goHome = () => {
    navigate("/");
    onClose();
  };

  return (
    <div
      className={`sidebar-overlay ${isOpen ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="sidebar" onClick={handleSidebarClick}>
        <div className="sidebar-header">
          <button className="hamburger-btn" onClick={onClose}>
            <FaBars />
          </button>
          <div className="sidebar-logo-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              className="sidebar-youtube-logo"
            />
            <span className="region-label">IN</span>
          </div>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-section">
            <li onClick={goHome}>
              <AiFillHome className="sidebar-icon" />
              <span>Home</span>
            </li>
            <li>
              <MdOutlineSmartDisplay className="sidebar-icon" />
              <span>Shorts</span>
            </li>
            <li>
              <MdSubscriptions className="sidebar-icon" />
              <span>Subscriptions</span>
            </li>
          </ul>
          <hr />
          <h3 className="sidebar-title">You</h3>
          <ul className="sidebar-section">
            <li>
              <MdHistory className="sidebar-icon" />
              <span>History</span>
            </li>
            <li>
              <MdVideoLibrary className="sidebar-icon" />
              <span>Playlists</span>
            </li>
            <li>
              <MdVideoLibrary className="sidebar-icon" />
              <span>Your videos</span>
            </li>
            <li>
              <MdOutlineWatchLater className="sidebar-icon" />
              <span>Watch later</span>
            </li>
            <li>
              <AiOutlineLike className="sidebar-icon" />
              <span>Liked videos</span>
            </li>
          </ul>
          <hr />
          <h3 className="sidebar-title">Subscriptions</h3>
          <ul className="sidebar-section">
            <li>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYN6dfxTgZmFXWtb0J-4UnPd1RYi9MN5JFEg&s"
                alt="Channel"
                className="channel-icon"
              />
              <span>MUNDI OPUS</span>
            </li>
            <li>
              <img
                src="https://yt3.googleusercontent.com/ytc/AIdro_nt7tb4qxxB3Exl4L07HMP3RmwcefPHf_Q6pcV9dTklog=s160-c-k-c0x00ffffff-no-rj"
                alt="Channel"
                className="channel-icon"
              />
              <span>DesiNerd</span>
            </li>
            <li>
              <img
                src="https://yt3.googleusercontent.com/ytc/AIdro_nVU-DJTXwsOV4HTq_Qi8ZLfoRGKNSyd_rx4MDJw13KGQ=s160-c-k-c0x00ffffff-no-rj"
                alt="Channel"
                className="channel-icon"
              />
              <span>The Gaming Fist</span>
            </li>
            <li>
              <img
                src="https://yt3.googleusercontent.com/704S41So1nsXofY3i5_AQ4hE4nM50TvDhuXmS_Ny1EZ9QZ2b-t_kaM3mfVnFu7IAaiJMe9KErw=s900-c-k-c0x00ffffff-no-rj"
                alt="Channel"
                className="channel-icon"
              />
              <span>Hayls World</span>
            </li>
            <li>
              <img
                src="https://yt3.googleusercontent.com/xdl4qDbVG9y3yb5l6_jUiIAPDjm5Bmk60y0rXYyR-J2L4uZhGXNurdBF9NL7ZAVOSYwavC0A4s8=s900-c-k-c0x00ffffff-no-rj"
                alt="Channel"
                className="channel-icon"
              />
              <span>Technical Suneja</span>
            </li>
            <li>
              <img
                src="https://i.pinimg.com/736x/cc/f1/dd/ccf1dd8acb21c00c41235d5f6094a5ec.jpg"
                alt="Channel"
                className="channel-icon"
              />
              <span>MrBeast</span>
            </li>
            <li>
              <img
                src="https://yt3.googleusercontent.com/utfTJ7b2YEJSS7Ta5t1NR2QzkMm4_ODijQZI8hKDIJA7msvsISYh1dyw2PLHjzlfr7hrW5sVrQ=s160-c-k-c0x00ffffff-no-rj"
                alt="Channel"
                className="channel-icon"
              />
              <span>Technology Gyan</span>
            </li>
          </ul>
          <hr />
          <h3 className="sidebar-title">Explore</h3>
          <ul className="sidebar-section">
            <li>Trending</li>
            <li>Shopping</li>
            <li>Music</li>
            <li>Movies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdVideoCall, MdNotificationsNone } from "react-icons/md";
import { IoAppsSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import "./Header.css";

export default function Header({ toggleSidebar, currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleUserIconClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/" className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="youtube-logo"
          />
          <span className="region-label">IN</span>
        </Link>
      </div>

      <form className="search-bar-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <FiSearch />
        </button>
      </form>

      <div className="header-right">
        <button className="mobile-search-btn" onClick={handleSearch}>
          <FiSearch />
        </button>
        {/* Upload icon navigates to upload page */}
        <MdVideoCall
          className="header-icon"
          onClick={() => navigate("/upload")}
        />
        <IoAppsSharp className="header-icon" />
        <MdNotificationsNone className="header-icon" />

        {currentUser ? (
          <div className="user-avatar-container">
            <img
              src={
                currentUser.avatar ||
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/99d73356-a5c8-465b-9e77-6f96cbd836ee/defmyc8-7cbff1dd-1506-4bbc-8f24-90201b6ff243.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk5ZDczMzU2LWE1YzgtNDY1Yi05ZTc3LTZmOTZjYmQ4MzZlZVwvZGVmbXljOC03Y2JmZjFkZC0xNTA2LTRiYmMtOGYyNC05MDIwMWI2ZmYyNDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._Lk2s-kgFiK2SRrfHgY7FQ9FamdOv3rqGBJ9o6bB23o"
              }
              alt={currentUser.username || "User"}
              className="profile-pic"
              onClick={handleUserIconClick}
            />
            {menuOpen && (
              <div className="user-dropdown">
                <ul>
                  {/* 1) View Channel */}
                  <li
                    onClick={() => {
                      setMenuOpen(false);
                      if (currentUser.channelId) {
                        navigate(`/channel/${currentUser.channelId}`);
                      } else {
                        alert("You don't have a channel yet. Please create one.");
                        navigate("/create-channel");
                      }
                    }}
                  >
                    View your channel
                  </li>
                  {/* 2) Edit Channel */}
                  {currentUser.channelId && (
                    <li
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(`/channel/${currentUser.channelId}/edit`);
                      }}
                    >
                      Edit Channel
                    </li>
                  )}
                  {/* 3) Sign out */}
                  <li
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn" onClick={() => navigate("/auth")}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

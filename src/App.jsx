// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import SearchPage from "./pages/SearchPage";
import AuthPage from "./pages/AuthPage";
import ChannelPage from "./pages/ChannelPage";
import UploadVideoPage from "./pages/UploadVideoPage";
import CreateChannelPage from "./pages/CreateChannelPage"; 
import ChannelEditPage from "./pages/ChannelEditPage";
import "./App.css";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div>
      <Header
        toggleSidebar={toggleSidebar}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:videoId" element={<VideoPlayer currentUser={currentUser}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/auth" element={<AuthPage setCurrentUser={setCurrentUser} />} />
          <Route path="/channel/:channelId/edit" element={<ChannelEditPage currentUser={currentUser} />} />
          <Route path="/channel/:channelId" element={<ChannelPage />} />
          <Route path="/upload" element={<UploadVideoPage />} />
          <Route path="/create-channel" element={<CreateChannelPage setCurrentUser={setCurrentUser} />} />
          
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

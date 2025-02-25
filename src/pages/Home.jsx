// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Example categories for the filter bar
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Education",
    "Movies",
    "News",
    "Sports",
    "Live",
    "Fashion",
    "Comedy",
    "Tech",
    "Other"
  ];

  // Fetch videos on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        setVideos(data);
        setFilteredVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Whenever selectedCategory changes, filter
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter((video) => video.category === selectedCategory);
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  return (
    <div>
      {/* Horizontal Filter Bar */}
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Video grid */}
      <div style={gridStyle}>
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  justifyContent: "center",
  padding: "1rem"
};

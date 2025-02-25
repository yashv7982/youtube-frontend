// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import SearchResultCard from "../components/SearchResultCard";
import "./SearchPage.css";

export default function SearchPage() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query") || "";
    setQuery(q);

    const fetchVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        const filtered = data.filter((video) =>
          video.title.toLowerCase().includes(q.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchVideos();
  }, [location.search]);

  return (
    <div className="search-page">
      <h2 className="search-heading">Search results for: {query}</h2>
      {results.map((video) => (
        <SearchResultCard key={video.videoId} video={video} />
      ))}
      {results.length === 0 && (
        <p className="no-results">No videos found for "{query}".</p>
      )}
    </div>
  );
}

// src/components/FilterBar.jsx
import React from "react";
import "./FilterBar.css";

export default function FilterBar({
  categories,
  selectedCategory,
  onCategorySelect
}) {
  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

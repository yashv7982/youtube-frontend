// src/components/CommentsSection.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import "./CommentsSection.css";

export default function CommentsSection({ videoId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await API.get(`/comments/video/${videoId}`);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [videoId]);

  // Add new comment
  const handleAddComment = async () => {
    if (!currentUser) {
      alert("Please sign in to comment.");
      return;
    }
    try {
      const { data } = await API.post("/comments", {
        videoId,
        userId: currentUser._id,
        text: newComment
      });
      setComments((prev) => [...prev, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Update an existing comment
  const handleUpdateComment = async (commentId, text) => {
    try {
      const { data } = await API.put(`/comments/${commentId}`, { text });
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? data : c))
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">{comments.length} Comments</h3>

      {/* Add comment box */}
      <div className="add-comment-box">
        <img
          className="comment-avatar"
          src={
            currentUser?.avatar ||
            "https://via.placeholder.com/40?text=User"
          }
          alt="User Avatar"
        />
        <div className="comment-input-container">
          <textarea
            className="comment-textarea"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comment-submit-btn" onClick={handleAddComment}>
            Comment
          </button>
        </div>
      </div>

      {/* Existing comments */}
      <div className="comments-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            currentUser={currentUser}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
}

function CommentItem({ comment, currentUser, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isOwner = currentUser && currentUser._id === comment.user._id;

  const handleSave = () => {
    onUpdate(comment._id, editText);
    setEditing(false);
  };

  return (
    <div className="comment-item">
      <img
        className="comment-avatar"
        src={
          comment.user.avatar ||
          "https://via.placeholder.com/40?text=User"
        }
        alt="User Avatar"
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.user.username}</span>
          <span className="comment-time">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        {editing ? (
          <textarea
            className="comment-edit-textarea"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}
        <div className="comment-actions">
          {isOwner && (
            editing ? (
              <>
                <button className="comment-action-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="comment-action-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="comment-action-btn"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="comment-action-btn"
                  onClick={() => onDelete(comment._id)}
                >
                  Delete
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

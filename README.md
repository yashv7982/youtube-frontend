# YouTube Clone (MERN Stack)

A full-stack YouTube-like application built with **MongoDB**, **Express**, **React**, and **Node.js**. Users can upload videos (by providing links), filter them by category, search for videos, comment on them, view channel pages, and more.

---

## 1. Project Overview

This project replicates core functionalities of YouTube:

- **Home Page**: Displays a grid of videos with filtering and searching.
- **Video Player Page**: Plays videos (local or YouTube embed), shows channel info (logo, name), and displays comments.
- **Channel Page**: Shows a channel’s videos along with the channel banner and logo.
- **User Authentication**: Users can register and log in, then upload videos and comment.
- **Comments**: Users can add, edit, and delete their own comments on videos.
- **Category Filtering**: Users can filter videos by category (e.g., Music, Gaming, Education, etc.).

---

## 2. Key Features

- **User Authentication**  
  - Register and log in using email/password.
  - JWT-based authentication for protected routes (uploading, commenting).

- **Channel Management**  
  - Create a channel (with banner, logo, description).
  - View channel details and videos on the channel page.

- **Video Upload**  
  - Upload video metadata (title, thumbnail, video URL, category).
  - If a YouTube video link is provided, the video is embedded via an `<iframe>`.

- **Home Page with Category Filter**  
  - A horizontal “chip” style filter bar to filter videos by category.
  - A search bar to filter videos by title.

- **Video Player Page**  
  - Plays the selected video.
  - Displays channel logo, channel name, subscribe button, like/dislike buttons, and description.
  - Includes a comment section with CRUD functionality for comments.

- **Comment Section**  
  - Display user avatar, username, timestamp, and comment text.
  - Allow the comment owner to edit or delete their comment.

---

## 3. Technologies Used

- **Frontend**:  
  - React (Vite or create-react-app)  
  - React Router  
  - Axios  
  - CSS (or CSS modules)

- **Backend**:  
  - Node.js  
  - Express.js  
  - MongoDB (with Mongoose)  
  - JSON Web Tokens (JWT)  
  - bcryptjs

---

## Install Server Dependencies

cd server
npm install


## Configure .env (Backend)

PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube_clone
JWT_SECRET=code

## Install Client Dependencies

cd ../client
npm install

##  Usage
##  Running the Backend

npm run dev

##  Running the Frontend

npm run dev

##  Open the App

http://localhost:5173

## API Endpoints (Overview)



POST /api/users/register – Register a new user.
POST /api/users/login – Log in and receive a JWT token.
Channel

POST /api/channels – Create a new channel (protected).
GET /api/channels/:id – Get channel details.
PUT /api/channels/:id – Update channel details (protected).
Video

GET /api/videos – Get all videos.
GET /api/videos/:id – Get a single video.
POST /api/videos – Upload a new video (protected; includes category).
PUT /api/videos/:id – Update video details (protected).
DELETE /api/videos/:id – Delete a video (protected).
Comment

GET /api/comments/video/:videoId – Get comments for a video.
POST /api/comments – Add a comment (protected).
PUT /api/comments/:id – Edit a comment (protected).
DELETE /api/comments/:id – Delete a comment (protected).

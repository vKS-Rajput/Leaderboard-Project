# 🏆 Leaderboard Task Project

A real-time leaderboard web application built using **ReactJS** for the frontend and **NodeJS** with **Socket.IO** and **MongoDB** for the backend. Users can select a player from a list, claim random points (1-10), and dynamically track the rankings and point history in real time.

---

## 🚀 Features

- 🎯 **User Selection** – Pick a user from the top 10 or add new ones dynamically.
- 🎲 **Random Points** – Claim between 1 and 10 points for the selected user.
- 📈 **Live Leaderboard** – See real-time ranking updates using Socket.IO.
- 🕓 **Point History** – View the full claim history for each user.
- 🔄 **Auto Refresh** – Leaderboard updates instantly across all clients.

---

## 📦 Tech Stack

### Frontend
- ReactJS (Vite)
- TailwindCSS (for styling)
- Socket.IO-client

### Backend
- NodeJS + Express
- MongoDB + Mongoose
- Socket.IO-server

---

## 📁 Project Structure

📦 leaderboard-project
├── 📂 client # React Frontend
│ ├── 📂 components # UserSelector, ClaimButton, Leaderboard, History
│ ├── 📄 App.jsx
│ └── 📄 main.jsx
├── 📂 server # NodeJS Backend
│ ├── 📂 models # User.js, History.js (MongoDB models)
│ ├── 📂 routes # API routes to manage users and claims
│ ├── 📄 index.js # Entry point with socket setup
│ └── 📄 db.js # MongoDB connection


---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/leaderboard-project.git
cd leaderboard-project

2. Install Server Dependencies

cd server
npm install

3. Start Backend Server

node index.js

4. Setup & Run Client

cd ../client
npm install
npm run dev


🔌 API Endpoints
Method	Endpoint	Description
GET	/api/users	Fetch all users
POST	/api/users	Add a new user
POST	/api/claim	Claim random points for a user
GET	/api/history/:id	Get claim history of a user

<img width="996" height="968" alt="Screenshot 2025-07-14 123309" src="https://github.com/user-attachments/assets/0f1eeb74-8d0c-48d4-93b1-797d7b504bf5" />

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork and submit a PR.

🙌 Acknowledgments

Built as part of a React + NodeJS Internship Task
Crafted with ❤️ by Vishwajeet Pratap Singh


---

Let me know if you want to:

- Convert this into a styled GitHub `README.md` with markdown visuals
- Add deployment instructions (Vercel + Render)
- Include sample data or `.env` setup
- Generate a project banner or badge set (e.g., GitHub stars, MIT license, etc.)




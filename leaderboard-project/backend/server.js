// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js'; // <- keep .js when using ES modules

// ────────────────────────────────────────────────────────────
config();                       // 1️⃣  Load .env variables
const app = express();          // 2️⃣  Create Express app
const httpServer = createServer(app);  // 3️⃣  HTTP → pass to Socket.IO

// 4️⃣  Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',          // dev frontend
    ],
    methods: ['GET', 'POST']
  }
});

// 5️⃣  Global middlewares
app.use(cors());
app.use(express.json());

// 6️⃣  Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 7️⃣  Routes
app.use('/api/users', userRoutes);

// 8️⃣  MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();

// 9️⃣  Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server live on http://localhost:${PORT}`)
);

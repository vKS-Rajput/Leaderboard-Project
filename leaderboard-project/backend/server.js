// server.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js'; // 👈 Include .js extension

config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Middleware
app.use(cors());
app.use(json());

// Share io instance with routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/users', userRoutes);

// Connect MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

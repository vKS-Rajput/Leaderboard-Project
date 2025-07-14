import { io } from 'socket.io-client';

// ✅ Use env var in dev, fallback for Vercel deployment
const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL || 'http://localhost:5000');

export default socket;

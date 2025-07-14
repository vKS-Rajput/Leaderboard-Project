import { io } from 'socket.io-client';

// ✅ Use env var in dev, fallback for Vercel deployment
const socket = io('http://localhost:5000');

export default socket;

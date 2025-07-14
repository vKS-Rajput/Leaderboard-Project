import { io } from 'socket.io-client';

const socket = io('https://leaderboard-project-alpha.vercel.app/'); // backend address
export default socket;

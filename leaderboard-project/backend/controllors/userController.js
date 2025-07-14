import User from '../models/User.js';
import PointHistory from '../models/PointHistory.js';

// Get all users (sorted by totalPoints descending)
export async function getUsers(req, res) {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
}

// Add a new user
export async function addUser(req, res) {
  const { name } = req.body;
  const user = await User.create({ name });
  req.io.emit('user-added', { user });
  res.status(201).json(user);
}

// Claim random points
export async function claimPoints(req, res) {
  const userId = req.params.id;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { totalPoints: points } },
    { new: true }
  );

  await PointHistory.create({ user: userId, pointsAwarded: points });

  req.io.emit('points-claimed', { user, pointsAwarded: points });

  res.json({ user, pointsAwarded: points });
}

// Get point claim history (optionally by userId)
export async function getHistory(req, res) {
  const { userId, page = 1, limit = 10 } = req.query;
  const filter = userId ? { user: userId } : {};

  const history = await PointHistory.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('user', 'name');

  res.json(history);
}

import { Router } from 'express';
const router = Router();
import { getUsers, addUser, claimPoints, getHistory } from '../controllors/userController.js';

router.get('/', getUsers);
router.post('/', addUser);
router.post('/claim/:id', claimPoints);
router.get('/history', getHistory);

export default router;

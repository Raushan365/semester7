import express from 'express';
import { isAuth, login, logout, register, updateProfile, changePassword } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);
userRouter.put('/me', auth, updateProfile);
userRouter.put('/change-password', auth, changePassword);

export default userRouter;
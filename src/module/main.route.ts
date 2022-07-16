import authRouter from './auth/route/auth.route';
import userRouter from './user/route/user.route';

export const mainRoute = [
    authRouter,
    userRouter,
];

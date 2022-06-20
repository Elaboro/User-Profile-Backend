import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRouter from './module/auth/route/auth.route';
import userRouter from './module/user/route/user.route';

dotenv.config();

const main = async () => {
    const app: Express = express();
    const PORT: string = process.env.PORT;

    app.use(express.json());

    app.use(
        "/api",
        authRouter,
        userRouter
    );

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default main;

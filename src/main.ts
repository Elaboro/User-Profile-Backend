import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRouter from './module/auth/route/auth.route';
import userRouter from './module/user/route/user.route';
import DataBase from './config/database';
import initSwagger from './config/swagger';

dotenv.config();

const main = async () => {
    const app: Express = express();
    const PORT: string = process.env.PORT;

    app.use(express.static("public"));

    app.use(express.json(),
        (err, req, res, next) => {
            if(err) {
                res.status(400);
                res.json({...err});
            }
        }
    );

    app.use(
        "/api",
        authRouter,
        userRouter
    );

    const {
        url,
        serve,
        setup
    } = initSwagger();
    app.use(url, serve, setup);

    try {
        await DataBase.initialize().then(() => {
            console.log("The connection to the database is established");
        });
    } catch (e) {
        console.log(`[ ERROR ] Database connection problems: ${e?.sqlMessage}`);
        console.log(e);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default main;

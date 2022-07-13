import express, { Express } from 'express';
import cfg from './config/app.config';
import authRouter from './module/auth/route/auth.route';
import userRouter from './module/user/route/user.route';
import DataBase from './config/database';
import initSwagger from './config/swagger';

const main = async () => {
    const app: Express = express();
    const PORT: string = cfg.PORT;

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
            console.log("Connection to database is established");
        });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e); 
    }
};

export default main;

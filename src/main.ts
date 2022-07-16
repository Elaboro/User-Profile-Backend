import express, { Express, NextFunction, Request, Response } from 'express';
import cfg from './config/app.config';
import { mainRoute } from './module/main.route';
import DataBase from './config/database';
import initSwagger from './config/swagger';

const main = async () => {
    const app: Express = express();
    const PORT: string = cfg.PORT;

    app.use(express.static(cfg.DIR_PUBLIC_ROOT));

    app.use(express.json(),
        (err: any, req: Request, res: Response, next: NextFunction) => {
            if(err) {
                res.status(400);
                res.json({...err});
            }
        }
    );

    app.use(cfg.API_URL_PREFIX, mainRoute);

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

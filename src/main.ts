import express, { Express } from 'express';
import cfg from './config/app.config';
import { mainRoute } from './module/main.route';
import DataBase from './config/database';
import initSwagger from './config/swagger';
import middlewareExpressJson from './middleware/middlewareExpressJson';
import middlewareErrorHandler from './middleware/middlewareErrorHandler';

const main = async () => {
    const app: Express = express();
    const PORT: string = cfg.PORT;

    app.use(express.static(cfg.DIR_PUBLIC_ROOT));

    app.use(express.json(), middlewareExpressJson);
    app.use(cfg.API_URL_PREFIX, mainRoute);
    app.use(middlewareErrorHandler);

    const { url, serve, setup } = initSwagger();
    app.use(url, serve, setup);

    await DataBase.initialize().then(() => {
        console.log("Connection to database is established");
    });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});

process.on('uncaughtException', async (error: Error) => {
    console.log(error);
    process.exit(1);
});

export default main;

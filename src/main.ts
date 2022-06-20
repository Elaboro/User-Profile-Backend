import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    const app: Express = express();
    const PORT: string = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

export default main;

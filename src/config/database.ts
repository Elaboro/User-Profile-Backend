import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: true,
    logging: (process.env.DATABASE_LOGGING?.toLowerCase() === "true"),
    entities: ["src/module/*/entity/*.{ts, js}"],
    subscribers: [],
    migrations: ["src/migration/*.{ts, js}"],
});

export default AppDataSource;

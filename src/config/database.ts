import { DataSource } from "typeorm";
import cfg from "./app.config";

const AppDataSource = new DataSource({
    type: "mysql",
    host: cfg.DATABASE_HOST,
    port: cfg.DATABASE_PORT,
    username: cfg.DATABASE_USERNAME,
    password: cfg.DATABASE_PASSWORD,
    database: cfg.DATABASE_DATABASE,
    synchronize: false,
    logging: (cfg.DATABASE_LOGGING?.toLowerCase() === "true"),
    entities: ["src/module/*/entity/*.{ts, js}"],
    subscribers: ["src/subscriber/*.{ts, js}"],
    migrations: ["src/migration/*.{ts, js}"],
});

export default AppDataSource;

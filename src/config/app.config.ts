import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const CONSTANTS = {
    DIR_PRIVATE_ROOT: path.join(__dirname, '..', '..', 'storage', 'private'),
    DIR_PUBLIC_ROOT: path.join(__dirname, '..', '..', 'storage', 'public'),
};

const cfg = {
    PORT: process.env.PORT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: Number(process.env.DATABASE_PORT),
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_DATABASE: process.env.DATABASE_DATABASE,
    DATABASE_LOGGING: process.env.DATABASE_LOGGING,
    JWT_SECRET_KEY: `${process.env.JWT_SECRET_KEY}`,
    JWT_EXPIRES_IN: `${process.env.JWT_EXPIRES_IN}`,
    URL_FILES: process.env.URL_FILES,
    API_URL_PREFIX: "/api",
    SWAGGER_OPTIONS_HOST: process.env.SWAGGER_OPTIONS_HOST,
    DIR_SRC_ROOT: path.join(__dirname, '..'),
    DIR_PUBLIC_ROOT: CONSTANTS.DIR_PUBLIC_ROOT,
    DIR_PRIVATE_ROOT: CONSTANTS.DIR_PRIVATE_ROOT,
    DIR_FILE_UPLOADER_TEMP_FILES: path.join(CONSTANTS.DIR_PRIVATE_ROOT, 'temp'),
    DIR_UPLOADED_FILES: path.join(CONSTANTS.DIR_PUBLIC_ROOT, 'file'),
};

export default cfg;

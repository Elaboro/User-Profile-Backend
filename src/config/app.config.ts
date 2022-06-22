import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const cfg = {
    DIR_SRC_ROOT: path.join(__dirname, '..'),
    DIR_PUBLIC_ROOT: path.join(__dirname, '..', '..', 'public'),
    URL_FILES: process.env.URL_FILES,
};

export default cfg;

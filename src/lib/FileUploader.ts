import multer, { Multer, StorageEngine } from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

export interface IConfig {
    destination: string;
    file_size_max: number;
    mimetype_white_list: Array<string>;
}

export interface FileUploader extends Multer {};

export const createFileUploader = (config: IConfig): FileUploader => {

    const storage: StorageEngine = multer.diskStorage({

        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
        ) => {
            cb(null, config.destination);
        },
    
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error, filename: string) => void
        ) => {
            const extension: string = file.originalname.split(".").pop();
            const name: string = uuidv4();
            const filename: string = `${name}.${extension}`;

            cb(null, filename);
        }
    });

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) => {
        if(config.mimetype_white_list.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: config.file_size_max
        }
    });
};

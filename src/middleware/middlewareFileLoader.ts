import multer from 'multer';
import fs from 'fs';
import { Request } from 'express';

export interface IMiddlewareFileLoader {
    file_path: string;
    file_size_max: number;
    mimetype_white_list: string[];
    onCreateFileName: (extension: string) => Promise<string>;
}

export interface IFileLoaded {
    extension,
    file_name,
    original_name
}

export default function middlewareFileLoader({
    file_path,
    mimetype_white_list,
    file_size_max,
    onCreateFileName
}: IMiddlewareFileLoader): multer.Multer {

    const storage: multer.StorageEngine = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error, destination: string) => void
        ) => {

            if (!fs.existsSync(file_path)) {
                fs.mkdirSync(file_path, { recursive: true });
            }

            cb(null, file_path);
        },

        filename: async (
            req: Request & { private_local: any },
            file: Express.Multer.File,
            cb: (error: Error, destination: string) => void
        ) => {
            const extension = file.originalname.split(".").pop();
            const file_name = await onCreateFileName(extension);
            const new_file_name = `${file_name}.${extension}`;
            
            const file_data: IFileLoaded = {
                extension,
                file_name,
                original_name: new_file_name
            };
            req.private_local = file_data;

            cb(null, new_file_name);
        }
    });

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) => {
        if(mimetype_white_list.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: file_size_max
        }
    });
};

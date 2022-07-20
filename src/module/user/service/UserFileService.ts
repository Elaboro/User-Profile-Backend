import path from "path";
import cfg from "../../../config/app.config";
import { FileDto } from "../../../type/Type";
import { FileSystemStorage } from "../../../lib/storage/FileSystemStorage";
import {
    Storage,
    StorageDelete,
    StorageMove,
} from "../../../lib/storage/type/type";
import { File } from "../entity/File";
import FileRepository from "../repository/FileRepository";
import { UserProfilePhotoDeleteDto } from "../dto/File";

interface ResultFileDelete {
    message: string;
    status: boolean;
    photo_id: string;
};

export class UserFileService {

    async save(dto: FileDto): Promise<File[]> {
        const file: File[] = await FileRepository.create(dto);
        
        const storage: Storage = new FileSystemStorage();

        const files: Express.Multer.File[] = <Express.Multer.File[]>dto.files;
        files.map(async (f: Express.Multer.File, i: number) => {

            const filename_new: string = `${file[i].filename}.${file[i].extension}`;

            storage.rename({
                path_old: path.join(f.destination, f.filename),
                path_new: path.join(f.destination, filename_new),
            });

            const item: StorageMove = {
                path_from: f.destination,
                path_to: cfg.DIR_UPLOADED_FILES,
                filename: filename_new,
            };
            storage.move(item);
        });

        return file;
    }

    async delete({ photo_id }: UserProfilePhotoDeleteDto, user_id: number): Promise<ResultFileDelete[]> {
        const arr_result: Promise<ResultFileDelete>[] = photo_id.map(async (filename: string) => {
            const result: ResultFileDelete = {
                message: null,
                status: false,
                photo_id: filename,
            };

            const fileEntity: File = await FileRepository.findFile(filename);

            if(!fileEntity) 
                return { ...result, message: "Entity not found" };

            if(fileEntity.user_id !== user_id) 
                return { ...result, message: "Forbidden: file does not belong to you" };

            const storage: Storage = new FileSystemStorage();
            const item: StorageDelete = {
                path: cfg.DIR_UPLOADED_FILES,
                filename: `${fileEntity.filename}.${fileEntity.extension}`
            };
            storage.delete(item);

            await FileRepository.deleteFile(fileEntity);

            return { ...result, message: "Deleted", status: true };
        }, this)

        return Promise.all(arr_result);
    };
}

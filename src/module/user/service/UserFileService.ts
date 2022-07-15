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
import { UserProfilePhotoDeleteDto } from "../dto-validation/File";

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

            const file_name_new: string = `${file[i].file_name}.${file[i].extension}`;

            storage.rename({
                path_old: path.join(f.destination, f.filename),
                path_new: path.join(f.destination, file_name_new),
            });

            const item: StorageMove = {
                path_from: f.destination,
                path_to: path.join(cfg.DIR_PUBLIC_ROOT, 'file'),
                file_name: file_name_new,
            };
            storage.move(item);
        });

        return file;
    }

    async delete({ photo_id }: UserProfilePhotoDeleteDto, user_id: number): Promise<ResultFileDelete[]> {
        const arr_result: Promise<ResultFileDelete>[] = photo_id.map(async (file_name: string) => {
            const result: ResultFileDelete = {
                message: null,
                status: false,
                photo_id: file_name,
            };

            const fileEntity: File = await FileRepository.findFile(file_name);

            if(!fileEntity) 
                return { ...result, message: "Entity not found" };

            if(fileEntity.user_id !== user_id) 
                return { ...result, message: "Forbidden: file does not belong to you" };

            const storage: Storage = new FileSystemStorage();
            const item: StorageDelete = {
                path: path.join(cfg.DIR_PUBLIC_ROOT, 'file'),
                file_name: `${fileEntity.file_name}.${fileEntity.extension}`
            };
            storage.delete(item);

            await FileRepository.deleteFile(fileEntity);

            return { ...result, message: "Deleted", status: true };
        }, this)

        return Promise.all(arr_result);
    };
}

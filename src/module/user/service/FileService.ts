import { IFileLoaded } from "../../../middleware/middlewareFileLoader";
import { UserProfilePhotoDeleteDto } from "../dto-validation/File";
import { File } from "../entity/File";
import FileRepository from "../repository/FileRepository";

interface ResultFileDelete {
    message: string;
    status: boolean;
    photo_id: string;
};

export class FileService {
    
    async saveFile(file: IFileLoaded, user_id: number): Promise<File> {
        return await FileRepository.saveFile({file, user_id});
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

            await FileRepository.deleteFile(fileEntity);

            return { ...result, message: "Deleted", status: true };
        }, this)

        return Promise.all(arr_result);
    };
}

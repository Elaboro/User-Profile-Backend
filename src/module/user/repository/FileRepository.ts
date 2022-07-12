import { Repository } from "typeorm";
import AppDataSource from "../../../config/database";
import { IFileLoaded } from "../../../middleware/middlewareFileLoader";
import { File } from "../entity/File";

const repo: Repository<File> = AppDataSource.getRepository(File);

const deleteFile = async (file: File): Promise<File> => {
    return await repo.remove(file);
};

const findFile = async (file_name: string): Promise<File> => {
    return await repo.findOne({ where: { file_name }});
}

const saveFile = async ({file, user_id}: { 
    file: IFileLoaded,
    user_id: number,
}): Promise<File> => {
    const photo: File = await repo.findOneBy({file_name: file.file_name});
    photo.user_id = user_id;
    return photo.save();
};

export default repo.extend({
    deleteFile,
    findFile,
    saveFile,
});

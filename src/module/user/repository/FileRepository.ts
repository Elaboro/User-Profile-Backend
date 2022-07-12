import { Repository } from "typeorm";
import AppDataSource from "../../../config/database";
import { File } from "../entity/File";

const repo: Repository<File> = AppDataSource.getRepository(File);

const deleteFile = async (file: File): Promise<File> => {
    return await repo.remove(file);
};

const findFile = async (file_name: string): Promise<File> => {
    return await repo.findOne({ where: { file_name }});
}

export default repo.extend({
    deleteFile,
    findFile,
});

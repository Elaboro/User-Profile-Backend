import { Repository } from "typeorm";
import AppDataSource from "../../../config/database";
import { FileDto } from "../../../type/Type";
import { File } from "../entity/File";

const repo: Repository<File> = AppDataSource.getRepository(File);

const deleteFile = async (file: File): Promise<File> => {
    return await repo.remove(file);
};

const findFile = async (filename: string): Promise<File> => {
    return await repo.findOne({ where: { filename }});
}

const create = async (dto: FileDto): Promise<File[]> => {

    const file_list: Promise<File>[] = (<Express.Multer.File[]>dto.files).map(
        async (f: Express.Multer.File): Promise<File> => {
            const file: File = new File();
            file.user_id = dto.user_payload.user_id;
            file.extension = f.filename.split(".").pop();
            return await file.save();
        }
    );

    return Promise.all(file_list);
};

export default repo.extend({
    deleteFile,
    findFile,
    create,
});

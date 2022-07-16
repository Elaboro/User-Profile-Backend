import {
    Storage,
    StorageDelete,
    StorageMove,
    StorageRename,
} from './type/type';
import fs,
{
    promises as fsp,
    ReadStream,
    WriteStream,
} from 'fs';
import path from 'path';

export class FileSystemStorage implements Storage {

    async rename(item: StorageRename): Promise<void> {
        try {
            return await fsp.rename(item.path_old, item.path_new);
        } catch (e) {
            console.log(e);
        }
    }

    async move(item: StorageMove): Promise<void> {
        try {
            if(!fs.existsSync(item.path_to)) {
                await fsp.mkdir(item.path_to, { recursive: true });
            }
    
            const readeble: ReadStream = fs.createReadStream(
                path.join(item.path_from, item.filename),
            );
    
            const writeble: WriteStream = fs.createWriteStream(
                path.join(item.path_to, item.filename)
            );
    
            readeble.pipe(writeble).on("finish", () => {
                fsp.unlink(path.join(item.path_from, item.filename));
            });
        } catch (e) {
            console.log(e);
        }
    }

    async delete(item: StorageDelete): Promise<void> {
        try {
            fsp.unlink(path.join(item.path, item.filename));
        } catch (e) {
            console.log(e);
        }
    }
}

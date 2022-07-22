import fs from 'fs';
import cfg from './app.config';

class FileSystem {
    initialize() {
        this.createDestination(cfg.DIR_PUBLIC_ROOT);
        this.createDestination(cfg.DIR_PRIVATE_ROOT);
        this.createDestination(cfg.DIR_FILE_UPLOADER_TEMP_FILES);
    };

    createDestination(path: string) {
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    }
}

export default new FileSystem();

import {
    createFileUploader,
    IConfig
} from "../lib/FileUploader";
import cfg from "../config/app.config";

const config: IConfig = {
    destination: cfg.DIR_FILE_UPLOADER_TEMP_FILES,
    file_size_max: 10485760 + 1,
    mimetype_white_list: [
        "image/jpeg",
        "image/png",
    ],
};

export default createFileUploader(config);

import cfg from "../../../config/app.config";
import { IPhoto, IUserProfile } from "../../../type/Type";
import { User } from "../entity/User";
import { File } from "../entity/File";

export const userProfilePhotoPresenter = (photo_array: File[]): IPhoto[] => {
    return photo_array.map((file: File): IPhoto => ({
        photo_id: file.file_name,
        link: `${cfg.URL_FILES}${file.file_name}.${file.extension}`,
    }));
};

export const userProfilePresenter = (user: User): IUserProfile => {

    const photo: IPhoto[] = userProfilePhotoPresenter(user.photo);

    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        surname: user.surname,
        gender: user.gender,
        created: user.created,
        photo: photo
    };
};

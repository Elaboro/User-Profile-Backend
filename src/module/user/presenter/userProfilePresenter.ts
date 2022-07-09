import cfg from "../../../config/app.config";
import { IPhoto, IUserProfile } from "../../../type/Type";
import { User } from "../entity/User";

export const userProfilePresenter = (user: User): IUserProfile => {

    const photo: IPhoto[] = user.photo.map((file): IPhoto => {
        const photo: IPhoto = {
            photo_id: file.file_name,
            link: `${cfg.URL_FILES}${file.file_name}.${file.extension}`,
        };
        return photo;
    });

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

export interface IUserProfile {
    user_id: number;
    name: string;
    email: string;
    surname: string;
    gender: boolean;
    created: Date;
    photo: IPhoto[];
}

export interface IPhoto {
    photo_id: string;
    link: string;
}

export interface IUserProfileList {
    total: number,
    page_last: number,
    user_profile_list: IUserProfile[],
}

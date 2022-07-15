import { JwtPayload } from "jsonwebtoken";

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

export type UserPayload = JwtPayload & {
    user_id: number;
    name: string;
    email: string;
}

export interface ILocals {
    user_payload: UserPayload;
}

export interface FileDto extends ILocals {
    files: {
        [fieldname: string]: Express.Multer.File[];
    } | Express.Multer.File[];
}

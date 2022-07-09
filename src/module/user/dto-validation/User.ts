import {
    check,
    ValidationChain
} from 'express-validator';

class UserField {
    readonly name: string;
    static validationName: ValidationChain = check("name")
        .notEmpty().withMessage("Can't be empty")
        .isLength({
            min: 2,
            max: 20
        }).withMessage("Field must contain from 2 to 20 characters");

    readonly email: string;
    static validationEmail: ValidationChain = check("email")
        .notEmpty().withMessage("Can't be empty")
        .isEmail().withMessage("Field must contain an email address");

    readonly password: string;
    static validationPassword: ValidationChain = check("password")
        .notEmpty().withMessage("Can't be empty")
        .isLength({
            min: 2,
            max: 20
        }).withMessage("Field must contain from 4 to 30 characters");

    readonly surname: string;
    static validationSurname: ValidationChain = check("surname")
        .isLength({
            min: 2,
            max: 20
        }).withMessage("Field must contain from 2 to 20 characters");

    readonly gender: boolean;
    static validationGender: ValidationChain = check("gender")
        .isBoolean().withMessage("Can be true or false")
        .toBoolean();
}


export type UserProfileUpdateDto = Omit<UserField,
    "validationName"
    | "validationEmail"
    | "validationPassword"
    | "validationSurname"
    | "validationGender"
    | "password"
>;
export const UserProfileEditValidation = [
    UserField.validationName,
    UserField.validationEmail,
    UserField.validationSurname,
    UserField.validationGender,
];

import {
    check,
    ValidationChain
} from 'express-validator';
import middlewareValidator from '../../../middleware/middlewareValidator';

class AuthUserSetting {
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
}

export type AuthRegisterUserDto = Pick<AuthUserSetting,
"name"
| "email"
| "password"
>;
export const AuthRegisterUserValidation = middlewareValidator([
    AuthUserSetting.validationName,
    AuthUserSetting.validationEmail,
    AuthUserSetting.validationPassword,
]);

export type AuthLoginUserDto = Pick<AuthUserSetting,
"email"
| "password"
>;
export const AuthLoginUserValidation = middlewareValidator([
    AuthUserSetting.validationEmail,
    AuthUserSetting.validationPassword,
]);

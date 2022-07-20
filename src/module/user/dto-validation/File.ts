import { check, ValidationChain } from "express-validator";
import middlewareValidator from "../../../middleware/middlewareValidator";

class FileField {
    readonly photo_id: Array<string>;
    static validationPhotoId: ValidationChain = check("photo_id")
        .notEmpty().withMessage("Can't be empty")
        .isArray().withMessage("Must be array")
        .custom((arr) => {
            const uuid4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
            arr.forEach((uuid: string) => {
                if(!uuid4.test(uuid)) throw new Error();  
            });
            return true;
        }).withMessage("String value in array must be uuid4");
}

export type UserProfilePhotoDeleteDto = Pick<FileField,
"photo_id"
>;
export const UserProfilePhotoDeleteValidation = middlewareValidator([
    FileField.validationPhotoId,
]);

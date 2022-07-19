import {
    NextFunction,
    Request,
    Response ,
} from "express";
import {
    ValidationChain,
    validationResult,
} from "express-validator";
import { HttpStatus } from "../lib/enum/HttpStatus";

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST);
        return res.json({
            ...errors
        });
    }

    next();
};

const middlewareValidator = (validation_chain: Array<ValidationChain>) => [
    ...validation_chain,
    validationHandler
];

export default middlewareValidator;

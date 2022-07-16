import {
    NextFunction,
    Request,
    Response ,
} from "express";
import {
    ValidationChain,
    validationResult,
} from "express-validator";

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.status(400);
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

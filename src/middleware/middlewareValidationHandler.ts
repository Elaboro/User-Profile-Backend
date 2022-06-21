import {
    Request,
    Response ,
} from "express";
import { validationResult } from "express-validator";

const middlewareValidationHandler = (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.status(400);
        return res.json({
            ...errors
        });
    }

    next();
};

export default middlewareValidationHandler;

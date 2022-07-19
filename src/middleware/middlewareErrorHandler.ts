import {
    Request,
    Response,
    NextFunction,
} from "express";
import { HttpStatus } from "../lib/enum/HttpStatus";
import { BaseError } from "../lib/error/Error";

const middlewareErrorHandler = (
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error: {
        status?: number;
        message?: string;
    } = {};

    if(err instanceof BaseError) {
        error.status = err?.status;
        error.message = err?.message;
    } else {
        error.status = HttpStatus.INTERNAL_SERVER_ERROR;
        error.message = "Internal Server Error";

        console.log(err);
    }

    res.status(error.status);
    res.json({
        error: {
            message: error.message
        }
    });
}

export default middlewareErrorHandler;

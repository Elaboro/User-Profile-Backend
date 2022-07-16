import {
    Request,
    Response,
    NextFunction,
} from "express";

const middlewareExpressJson = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err) {
        res.status(400);
        res.json(err);
    }
}

export default middlewareExpressJson;

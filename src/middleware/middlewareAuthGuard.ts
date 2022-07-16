import {
    NextFunction,
    Request,
    Response ,
} from "express";
import jwt from 'jsonwebtoken';
import cfg from "../config/app.config";
import {
    ILocals,
    UserPayload
} from "../type/Type";

const middlewareAuthGuard = (
    req: Request,
    res: Response & { locals: ILocals },
    next: NextFunction
) => {
    const auth_header: string = req?.headers?.authorization;
    const bearer: string = auth_header?.split(' ')[0]?.toLowerCase();
    const token: string = auth_header?.split(' ')[1];

    if (bearer !== "bearer" || !token) {
        return res.status(403).json({
            message: "Forbidden: User is unauthorized"
        });
    }

    const user_payload: UserPayload = <UserPayload>jwt.verify(token, cfg.JWT_SECRET_KEY);
    res.locals.user_payload = user_payload;
    next();
};

export default middlewareAuthGuard;

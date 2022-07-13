import {
    Request,
    Response ,
} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import cfg from "../config/app.config";
import { User } from "../module/user/entity/User";

const middlewareAuthGuard = (req: Request, res: Response, next) => {
    const auth_header: string = req?.headers?.authorization;
    const bearer: string = auth_header?.split(' ')[0]?.toLowerCase();
    const token: string = auth_header?.split(' ')[1];

    if (bearer !== "bearer" || !token) {
        return res.status(403).json({
            message: "Forbidden: User is unauthorized"
        });
    }

    const user: string | JwtPayload | User = jwt.verify(token, cfg.JWT_SECRET_KEY);
    req.app.locals.user = user;
    next();
};

export default middlewareAuthGuard;

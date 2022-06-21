import {
    Request,
    Response,
    Router
} from 'express';
import middlewareValidationHandler from '../../../middleware/middlewareValidationHandler';
import {
    AuthLoginUserDto,
    AuthLoginUserValidation,
    AuthRegisterUserDto,
    AuthRegisterUserValidation,
} from '../dto-validation/AuthUserDto';
import { AuthService } from '../service/AuthService';

const router: Router = Router();
const authService = new AuthService();

router.post("/user/register",
    AuthRegisterUserValidation,
    middlewareValidationHandler,
    async (req: Request, res: Response) => {
        const dto: AuthRegisterUserDto = req?.body;

        const token: string = await authService.register(dto);

        res.json({token});
    }
);

router.post("/user/login",
    AuthLoginUserValidation,
    middlewareValidationHandler,
    async (req: Request, res: Response) => {
        const dto: AuthLoginUserDto = req?.body;

        const token: string = await authService.login(dto);

        res.json({token});
    }
);

export default router;

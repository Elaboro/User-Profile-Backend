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

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *     - Auth
 *     summary: User registration
 *     parameters:
 *     - in: body
 *       name: body
 *       schema:
 *         type: object
 *         required:
 *         - name
 *         - email
 *         - password
 *         properties:
 *           name:
 *             example: user
 *             type: string
 *           email:
 *             example: user@user.user
 *             type: string
 *           password:
 *             example: user
 *             type: string
 *     responses:
 *       200:
 *         description: Successfully
 */
router.post("/user/register",
    AuthRegisterUserValidation,
    middlewareValidationHandler,
    async (req: Request, res: Response) => {
        const dto: AuthRegisterUserDto = req?.body;

        const token: string = await authService.register(dto);

        res.json({token});
    }
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: User authorization
 *     parameters:
 *     - in: body
 *       name: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - password
 *         properties:
 *           email:
 *             example: user@user.user
 *             type: string
 *           password:
 *             example: user
 *             type: string
 *     responses:
 *       200:
 *         description: Successfully
 */
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

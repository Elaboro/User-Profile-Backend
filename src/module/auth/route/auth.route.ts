import {
    Request,
    Response,
    Router
} from 'express';
import { User } from '../../user/entity/User';
import { AuthService } from '../service/AuthService';

const router: Router = Router();
const authService = new AuthService();

router.post("/user/register",
    async (req: Request, res: Response) => {
        const dto: User = req?.body;

        const token: string = await authService.register(dto);

        res.json({token});
    }
);

router.post("/user/login",
    async (req: Request, res: Response) => {
        const dto: User = req?.body;

        const token: string = await authService.login(dto);

        res.json({token});
    }
);

export default router;

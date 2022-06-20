import {
    Request,
    Response,
    Router
} from 'express';

const router: Router = Router();

router.post("/user/register",
    (req: Request, res: Response) => {
        res.json({});
    }
);

router.post("/user/login",
    (req: Request, res: Response) => {
        res.json({});
    }
);

export default router;

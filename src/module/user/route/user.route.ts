import {
    Request,
    Response,
    Router
} from 'express';

const router: Router = Router();

router.put("/profile/:user_id",
    (req: Request, res: Response) => {
        const user_id: any = req.params?.user_id;
        res.json({user_id});
    }
);

router.get("/profile/:user_id",
    (req: Request, res: Response) => {
        const user_id: any = req.params?.user_id;
        res.json({user_id});
    }
);

router.get("/profile",
    (req: Request, res: Response) => {
        const page_id: any = req.query?.page;
        res.json({page_id});
    }
);

export default router;

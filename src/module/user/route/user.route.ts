import {
    Request,
    Response,
    Router
} from 'express';
import middlewareValidationHandler from '../../../middleware/middlewareValidationHandler';
import middlewareFileLoader, { IFileLoaded } from '../../../middleware/middlewareFileLoader';
import { UserProfileUpdateDto, UserProfileEditValidation } from '../dto-validation/User';
import path from 'path';
import cfg from '../../../config/app.config';
import { IUserList, UserService } from '../service/UserService';
import { User } from '../entity/User';
import { File } from '../entity/File';

const middlewareFileLoaderConfig = {
    file_path: path.join(cfg.DIR_PUBLIC_ROOT, 'file'),
    file_size_max: 10485760 + 1,
    mimetype_white_list: [
        "image/jpeg",
        "image/png",
    ],
};

const userService = new UserService();

const router: Router = Router();

router.put("/profile/:user_id",
    UserProfileEditValidation,
    middlewareValidationHandler,
    async (req: Request, res: Response) => {
        const user_id: any = req.params?.user_id;
        const dto: UserProfileUpdateDto = req?.body;

        const user: User = await userService.update({...dto, user_id});

        res.json({user});
    }
);

const onCreateFileName = async (extension: string): Promise<string> => {
    const file: File = new File();
    file.extension = extension;
    await file.save();

    return file.file_name;
};

router.post("/profile/:user_id/photo/upload",
    middlewareFileLoader({
        ...middlewareFileLoaderConfig,
        onCreateFileName
    }).single("photo"),
    async (req: Request & { private_local: IFileLoaded }, res: Response) => {
        const user_id: any = req.params?.user_id;
        const file_name = req.private_local.file_name;

        const photo: File = await File.findOneBy({file_name});
        photo.user_id = user_id;
        photo.save();

        const file_loaded = req.private_local;

        res.json({file_loaded});
    }
);

router.get("/profile/:user_id",
    async (req: Request, res: Response) => {
        const user_id: any = req.params?.user_id;

        const user: User = await User.findOneBy({user_id});
        delete user.password;

        res.json({user});
    }
);

router.get("/profile",
    async (req: any, res: Response) => {
        const page: number = Number(req.query?.page) || 1;
        const limit: number = Number(req.query?.limit) || 10;

        const {
            total,
            page_last,
            user_list
        }: IUserList = await userService.getUserList(page, limit);

        res.setHeader("x-total-count", total);
        res.setHeader("x-page-current", page);
        res.setHeader("x-page-last", page_last);

        res.json({user_list});
    }
);

export default router;

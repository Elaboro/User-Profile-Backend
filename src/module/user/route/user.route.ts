import {
    Request,
    Response,
    Router
} from 'express';
import middlewareValidationHandler from '../../../middleware/middlewareValidationHandler';
import middlewareFileLoader, { IFileLoaded } from '../../../middleware/middlewareFileLoader';
import middlewareAuthGuard from '../../../middleware/middlewareAuthGuard';
import {
    UserProfileUpdateDto,
    UserProfileEditValidation
} from '../dto-validation/User';
import path from 'path';
import cfg from '../../../config/app.config';
import { UserService } from '../service/UserService';
import { File } from '../entity/File';
import {
    IUserProfile,
    IUserProfileList,
} from '../../../type/Type';

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

/**
 * @swagger
 * /profile/{user_id}:
 *   put:
 *     security:
 *       - jwt: []
 *     tags:
 *     - User
 *     summary: Editing user profile
 *     parameters:
 *     - name: user_id
 *       example: 1
 *       in: path
 *       required: true
 *     - in: body
 *       name: body
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             example: user
 *             type: string
 *           email:
 *             example: user@user.user
 *             type: string
 *           surname:
 *             example: surname user
 *             type: string
 *           gender:
 *             #example:
 *             #  - 1
 *             oneOf:
 *               - type: boolean
 *                 example: true
 *               - type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully
 */
router.put("/profile/:user_id",
    middlewareAuthGuard,
    UserProfileEditValidation,
    middlewareValidationHandler,
    async (req: Request, res: Response) => {
        const user_req: any = req.app.locals?.user;
        const user_id: number = Number(req.params?.user_id);

        if(Number(user_req?.user_id) !== user_id) {
            return res.status(403).json({
                message: "Forbidden: Cannot be edited."
            });
        }

        const dto: UserProfileUpdateDto = req?.body;

        const user: IUserProfile = await userService.update({...dto, user_id});

        res.json({user});
    }
);

const onCreateFileName = async (extension: string): Promise<string> => {
    const file: File = new File();
    file.extension = extension;
    await file.save();

    return file.file_name;
};

/**
 * @swagger
 * /profile/{user_id}/photo/upload:
 *   post:
 *     security:
 *       - jwt: []
 *     tags:
 *     - User
 *     summary: Uploading photo for user profile
 *     parameters:
 *     - name: user_id
 *       example: 1
 *       in: path
 *       required: true
 *       type: number
 *     - name: photo
 *       in: formData
 *       type: file
 *       required: true
 *     responses:
 *       200:
 *         description: Successfully
 */
router.post("/profile/:user_id/photo/upload",
    middlewareAuthGuard,
    middlewareFileLoader({
        ...middlewareFileLoaderConfig,
        onCreateFileName
    }).single("photo"),
    async (req: Request & { private_local: IFileLoaded }, res: Response) => {
        const user_req: any = req.app.locals?.user;
        const user_id: number = Number(req.params?.user_id);

        if(Number(user_req?.user_id) !== user_id) {
            return res.status(403).json({
                message: "Forbidden: Cannot be uploaded."
            });
        }

        const file_name = req.private_local.file_name;

        const photo: File = await File.findOneBy({file_name});
        photo.user_id = user_id;
        photo.save();

        const file_loaded = req.private_local;

        res.json({file_loaded});
    }
);

/**
 * @swagger
 * /profile/{user_id}:
 *   get:
 *     tags:
 *     - User
 *     summary: Get user profile data
 *     parameters:
 *     - name: user_id
 *       example: 1
 *       in: path
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: Successfully
 */
router.get("/profile/:user_id",
    async (req: Request, res: Response) => {
        const user_id: number = Number(req.params?.user_id);

        const profile: IUserProfile = await userService.getUserProfileById(user_id);

        res.json({...profile});
    }
);

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *     - User
 *     summary: Get list of profiles of all users
 *     description: |
 *       Returns all user profiles.
 *       You can select limit and page.
 *       You can also get data in the header:
 *       - x-page-current (current page)
 *       - x-page-last (last page)
 *       - x-total-count (total number of user profiles)
 *     parameters:
 *     - in: query
 *       name: page
 *       type: number
 *     - in: query
 *       name: limit
 *       type: number
 *     responses:
 *       200:
 *         description: Successfully
 */
router.get("/profile",
    async (req: any, res: Response) => {
        const page: number = Number(req.query?.page) || 1;
        const limit: number = Number(req.query?.limit) || 10;

        const {
            total,
            page_last,
            user_profile_list
        }: IUserProfileList = await userService.getUserList(page, limit);

        res.setHeader("x-total-count", total);
        res.setHeader("x-page-current", page);
        res.setHeader("x-page-last", page_last);

        res.json(user_profile_list);
    }
);

export default router;

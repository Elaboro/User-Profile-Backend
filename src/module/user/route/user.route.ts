import {
    Request,
    Response,
    Router
} from 'express';
import middlewareAuthGuard from '../../../middleware/middlewareAuthGuard';
import middlewareProfilePhotoUploader from '../../../middleware/middlewareProfilePhotoUploader';
import {
    UserProfileUpdateDto,
    UserProfileEditValidation,
} from '../dto-validation/User';
import { UserService } from '../service/UserService';
import { File } from '../entity/File';
import {
    FileDto,
    ILocals,
    IUserProfile,
    IUserProfileList,
    UserPayload,
} from '../../../type/Type';
import {
    UserProfilePhotoDeleteDto,
    UserProfilePhotoDeleteValidation
} from '../dto-validation/File';
import { UserFileService } from '../service/UserFileService';
import { userProfilePhotoPresenter } from '../presenter/userProfilePresenter';

const userService = new UserService();
const userFileService = new UserFileService();

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
    async (req: Request, res: Response & { locals: ILocals }) => {
        const user_payload: UserPayload = res.locals.user_payload;
        const user_id: number = Number(req.params?.user_id);

        if(Number(user_payload?.user_id) !== user_id) {
            return res.status(403).json({
                message: "Forbidden: Cannot be edited."
            });
        }

        const dto: UserProfileUpdateDto = req?.body;

        const user: IUserProfile = await userService.update({...dto, user_id});

        res.json(user);
    }
);

/**
 * @swagger
 * /profile/{user_id}/photo/upload:
 *   post:
 *     security:
 *       - jwt: []
 *     tags:
 *     - User files
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
    middlewareProfilePhotoUploader.array("photo"),
    async (req: Request, res: Response & { locals: ILocals }) => {
        const user_payload: UserPayload = res.locals.user_payload;
        const user_id: number = Number(req.params?.user_id);

        if(Number(user_payload?.user_id) !== user_id) {
            return res.status(403).json({
                message: "Forbidden: Cannot be uploaded."
            });
        }

        const dto: FileDto = {
            files: req.files,
            user_payload: res.locals.user_payload
        };

        const photo_array: File[] = await userFileService.save(dto);
        res.json(userProfilePhotoPresenter(photo_array));
    }
);

/**
 * @swagger
 * /profile/{user_id}/photo/delete:
 *   post:
 *     security:
 *       - jwt: []
 *     tags:
 *     - User files
 *     summary: Delete photo or array photos by id
 *     parameters:
 *     - name: user_id
 *       example: 1
 *       in: path
 *       required: true
 *       type: number
 *     - in: body
 *       name: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           photo_id:
 *             example: |
 *               [
 *                 "1f527223-76e9-4ee3-bce5-4900072bc393",
 *                 "0cb19040-69eb-4639-b871-bafcbda43304",
 *                 "2f44ed67-412a-4e6f-818f-16e6c66ca3e5"
 *               ]
 *             type: array
 *             items:
 *               type: string
 *               format: uuid
 *     responses:
 *       200:
 *         description: Successfully
 */
router.post("/profile/:user_id/photo/delete",
    middlewareAuthGuard,
    UserProfilePhotoDeleteValidation,
    async (req: Request, res: Response & { locals: ILocals }) => {
        const user_payload: UserPayload = res.locals.user_payload;
        const dto: UserProfilePhotoDeleteDto = { photo_id: req.body?.photo_id};

        const result = await userFileService.delete(dto, user_payload.user_id);
        res.json(result);
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
    async (req: Request, res: Response) => {
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

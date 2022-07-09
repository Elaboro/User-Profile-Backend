import AppDataSource from "../../../config/database";
import {
    Repository,
    SelectQueryBuilder,
} from "typeorm";
import { User } from "../entity/User";
import { UserProfileUpdateDto } from "../dto-validation/User";
import { AuthRegisterUserDto } from "../../auth/dto-validation/AuthUserDto";

const repo: Repository<User> = AppDataSource.getRepository(User);

const getUserList = async (page: number, limit: number): Promise<User[]> => {
    const skip: number = (page - 1) * limit;

    const qb: SelectQueryBuilder<User> = repo.createQueryBuilder("t");
    qb.leftJoinAndSelect("t.photo", "p");
    qb.skip(skip).take(limit);
    qb.addOrderBy("t.created", "ASC");
    return await qb.getMany();
};

const getUserTotal = async (): Promise<number> => {
    return await repo.createQueryBuilder().getCount();
};

const getUserById = async (user_id: number): Promise<User> => {
    return await repo.findOneBy({user_id});
};

const updateUserData = async (dto: UserProfileUpdateDto & { user_id: number }): Promise<User> => {
    const {
        user_id
    } = dto;

    const user: User = await repo.findOneBy({user_id});
    user.name = dto.name;
    user.email = dto.email;
    user.surname = dto.surname;
    user.gender = dto.gender;
    await user.save();

    delete user.password;
    
    return user;
};

const createUser = async (dto: AuthRegisterUserDto): Promise<User> => {
    const user: User = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    await user.save();

    return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
    return await repo.findOne({
        where: { email }
    });
}

export default repo.extend({
    getUserList,
    getUserTotal,
    getUserById,
    updateUserData,
    createUser,
    getUserByEmail,
});

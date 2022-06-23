import AppDataSource from "../../../config/database";
import {
    Repository,
    SelectQueryBuilder,
} from "typeorm";
import { User } from "../entity/User";

const repo: Repository<User> = AppDataSource.getRepository(User);

const getUserList = async (page: number, limit: number): Promise<User[]> => {
    const skip: number = (page - 1) * limit;

    const qb: SelectQueryBuilder<User> = repo.createQueryBuilder();
    qb.skip(skip).take(limit);
    qb.addOrderBy("created", "ASC");
    return await qb.getMany();
};

const getUserTotal = async (): Promise<number> => {
    return await repo.createQueryBuilder().getCount();
};

export default repo.extend({
    getUserList,
    getUserTotal,
});

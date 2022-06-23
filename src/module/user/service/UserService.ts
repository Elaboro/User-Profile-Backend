import { UserProfileUpdateDto } from "../dto-validation/User";
import { User } from "../entity/User";
import UserRepository from "../repository/UserRepository";

export interface IUserList {
    total: number,
    page_last: number,
    user_list: User[],
}

export class UserService {

    async update(dto: UserProfileUpdateDto & { user_id: number }): Promise<User> {
        try {
            const {
                user_id
            } = dto;

            const user: User = await User.findOneBy({user_id});
            user.name = dto.name;
            user.email = dto.email;
            user.surname = dto.surname;
            user.gender = dto.gender;
            await user.save();

            delete user.password;
            
            return user;
        } catch(e) {
            console.log(e);
        }
    }

    async getUserList(page: number, limit: number): Promise<IUserList> {
        const user_list: User[] = await UserRepository.getUserList(page, limit);

        const total: number = await UserRepository.getUserTotal();
        const page_last = Math.ceil(total / limit);

        return {
            total,
            page_last,
            user_list,
        };
    }
}

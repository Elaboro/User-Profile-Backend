import { IUserProfile, IUserProfileList } from "../../../type/Type";
import { UserProfileUpdateDto } from "../dto-validation/User";
import { User } from "../entity/User";
import { userProfilePresenter } from "../presenter/userProfilePresenter";
import UserRepository from "../repository/UserRepository";

export class UserService {

    async update(dto: UserProfileUpdateDto & { user_id: number }): Promise<IUserProfile> {
        const user: User = await UserRepository.updateUserData(dto);

        return userProfilePresenter(user);
    }

    async getUserList(page: number, limit: number): Promise<IUserProfileList> {
        const user_list: User[] = await UserRepository.getUserList(page, limit);

        const user_profile_list: IUserProfile[] = user_list.map((user) => {
            return userProfilePresenter(user);
        });

        const total: number = await UserRepository.getUserTotal();
        const page_last = Math.ceil(total / limit);

        return {
            total,
            page_last,
            user_profile_list,
        };
    }

    async getUserProfileById(user_id: number): Promise<IUserProfile> {
        const user: User = await UserRepository.getUserById(user_id);

        return userProfilePresenter(user);
    }
}

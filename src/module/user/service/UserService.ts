import { UserProfileUpdateDto } from "../dto-validation/User";
import { User } from "../entity/User";

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
}

import { User } from '../../user/entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    AuthLoginUserDto,
    AuthRegisterUserDto,
} from '../dto-validation/AuthUserDto';

dotenv.config();

export class AuthService {
    async register(dto: AuthRegisterUserDto): Promise<string> {
        try {
            const isUserCreated: User = await User.findOne<User>({
                where: { email: dto.email }
            });

            if(isUserCreated) {
                throw "User is already registered";
            }

            const password_hash: string = await bcrypt.hash(dto.password, 8);

            const user: User = new User();
            user.name = dto.name;
            user.email = dto.email;
            user.password = password_hash;
            await user.save();

            return this.generateToken(user);
        } catch (e) { 
            console.log(e);
        }
    }

    async login(dto: AuthLoginUserDto): Promise<string> {
        try {
            const email: string  = dto.email;

            const user = await User.findOne({ 
                where: { email }
            });

            if(!user) {
                throw "User not found";
            }

            const isPasswordEquals: boolean = await bcrypt.compare(
                dto.password,
                user.password
            );

            if(!isPasswordEquals) {
                throw "Invalid password";
            }

            return this.generateToken(user);
        } catch (e) {
            console.log(e);
        }
    }

    private generateToken({
        user_id,
        name,
        email
    }: User): string {

        const payload = {
            user_id,
            name,
            email
        };

        return jwt.sign(
            payload,
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: `${process.env.JWT_EXPIRES_IN}` }
        );
    }
}
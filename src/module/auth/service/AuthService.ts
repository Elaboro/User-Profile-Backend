import cfg from '../../../config/app.config';
import { User } from '../../user/entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    AuthLoginUserDto,
    AuthRegisterUserDto,
} from '../dto-validation/AuthUserDto';
import UserRepository from '../../user/repository/UserRepository';
import { UserPayload } from '../../../type/Type';

export class AuthService {

    async register(dto: AuthRegisterUserDto): Promise<string> {
        try {
            const isUserCreated: User = await UserRepository.getUserByEmail(dto.email);
            if(isUserCreated) {
                throw "User is already registered";
            }

            const password_hash: string = await bcrypt.hash(dto.password, 8);
            const user = await UserRepository.createUser({...dto, password: password_hash});

            return this.generateToken(user);
        } catch (e) { 
            console.log(e);
        }
    }

    async login(dto: AuthLoginUserDto): Promise<string> {
        try {
            const user: User = await UserRepository.getUserWithPasswordByEmail(dto.email);
            if(!user) {
                throw "User not found";
            }

            const isPasswordEquals: boolean = await bcrypt.compare(
                dto.password,
                user.password
            );
            delete user.password;
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
        const payload: UserPayload = {
            user_id,
            name,
            email
        };

        return jwt.sign(
            payload,
            cfg.JWT_SECRET_KEY,
            { expiresIn: cfg.JWT_EXPIRES_IN }
        );
    }
}

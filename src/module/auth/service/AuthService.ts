import cfg from '../../../config/app.config';
import { User } from '../../user/entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    AuthLoginUserDto,
    AuthRegisterUserDto,
} from '../dto/AuthUserDto';
import UserRepository from '../../user/repository/UserRepository';
import { UserPayload } from '../../../type/Type';
import {
    DuplicateError,
    ForbiddenError,
    NotFoundError,
} from '../../../lib/error/Error';

export class AuthService {

    async register(dto: AuthRegisterUserDto): Promise<string> {
        const isUserCreated: User = await UserRepository.getUserByEmail(dto.email);
        if(isUserCreated) {
            throw new DuplicateError("User is already registered");
        }

        const password_hash: string = await bcrypt.hash(dto.password, 8);
        const user = await UserRepository.createUser({...dto, password: password_hash});

        return this.generateToken(user);
    }

    async login(dto: AuthLoginUserDto): Promise<string> {
        const user: User = await UserRepository.getUserWithPasswordByEmail(dto.email);
        if(!user) {
            throw new NotFoundError("User is unregistered");
        }

        const isPasswordEquals: boolean = await bcrypt.compare(
            dto.password,
            user.password
        );
        delete user.password;
        if(!isPasswordEquals) {
            throw new ForbiddenError("Invalid password");
        }

        return this.generateToken(user);
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

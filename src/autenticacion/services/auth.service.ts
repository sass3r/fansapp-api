import { constants } from 'buffer';
import *  as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { PayloadToken } from '../models/auth.interface';
import User from '../models/user';
import { UserModel } from '../models/user.model';
import UserService from './user.service';

export class AuthService {
    constructor(
        private userService: UserService,
        private jwtInstance = jwt
    ) {
        dotenv.config();
    }

    public async validateUser(email: string, password: string): Promise<UserModel | null> {
        const userByEmail = await this.userService.findByEmail(email);

        if(userByEmail) {
            const isMatch = await userByEmail.comparePassword(password);
            if(isMatch) {
                return userByEmail;
            }
        }

        return null;
    }

    sign(payload: jwt.JwtPayload , secret: string) {
        return this.jwtInstance.sign(payload, secret);
    }

    public async generateJWT(user: UserModel): Promise<{accessToken: string; user: UserModel}> {
        const payload: PayloadToken = {
            user: user._id
        }

        return {
            accessToken: this.sign(payload,process.env.JWT_SECRET),
            user
        };
    }

}
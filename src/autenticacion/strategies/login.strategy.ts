import { UserModel } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import {Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import UserService from "../services/user.service";
import UserSchema from "../models/user.schema";

const userSchema: UserSchema = UserSchema.getInstance();
const userService: UserService = new UserService(userSchema);
const authService: AuthService = new AuthService(userService);

export class LoginStrategy {


    async validate(email: string, password: string, done: any) : Promise<UserModel> {
        const user = await authService.validateUser(email, password);
        if(!user) {
            return done(null, false, {message: 'Invalid email or password'});
        }
        user.password = "";

        return done(null, user);
    }
    
    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            'login', 
            LocalStrategy, 
            { 
                usernameField: 'email', 
                passwordField: 'password',
            },
            this.validate
        );
    }
}
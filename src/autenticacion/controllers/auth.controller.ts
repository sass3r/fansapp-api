import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(private authService: AuthService) {

    }

    async login(req: Request, res: Response) {
        try {
            const userEncode = req.user as UserModel;
            const encode = await this.authService.generateJWT(userEncode);
            if(!encode) {
                return res.status(401).json({error: 'Not authorized'});
            }

            res.header('Content-Type', 'application/json');
            res.cookie('accessToken', encode.accessToken, { maxAge: 6000 * 60});
            res.write(JSON.stringify(encode));
            res.end()
        } catch (err) {
            console.log(err);
            return res.status(401).json({error: 'Invalid credentials'});
        }
    }
}
import { Router } from 'express';
import User from '../models/user';
import { SharedMiddleware } from '../middlewares/shared.middleware';
import { UserMiddleware } from '../middlewares/user.middleware';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoute {

    public router: Router;

    constructor(
        private authController: AuthController,
        private middleware: SharedMiddleware,
        private userMiddleware: UserMiddleware
    ){
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post(
            '/api/login',
            this.middleware.passAuth('login'),
            (req, res, next) => [this.userMiddleware.loginValidator(req, res, next)],
            (req, res) => this.authController.login(req,res)
        );
    }

}




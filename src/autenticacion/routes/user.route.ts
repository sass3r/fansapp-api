import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { SharedMiddleware } from '../middlewares/shared.middleware';

class UserRoute {

    public router: Router;

    constructor(
        private userService: UserService,
        private userController: UserController,
        private middleware: UserMiddleware,
        private sharedMiddleware: SharedMiddleware
    ){
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get(
            '/api/users',
            this.sharedMiddleware.passAuth('jwt'), 
            (req, res) => this.userController.getAll(req,res)
        ); 

        this.router.post(
            '/api/users',
            (req, res, next) => [this.middleware.userValidator(req, res, next)], 
            (req, res) => this.userController.save(req,res)
        );

        this.router.post(
            '/api/users/photo',
            this.sharedMiddleware.passAuth('jwt'),
            this.middleware.upload.single('file'), 
            (req, res) => this.userController.uploadPhoto(req,res)
        );

        this.router.get(
            '/api/users/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)],
            (req, res) => this.userController.findOne(req,res)
        );

        this.router.delete(
            '/api/users/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)],
            (req, res) => this.userController.delete(req,res)
        );
        
        this.router.put(
            '/api/users/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)], 
            (req, res) => this.userController.update(req,res)
        );
    }

}

export default UserRoute;



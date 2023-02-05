import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import User from '../models/user';

class UserRoute {

    public router: Router;

    constructor(
        private userService: UserService,
        private userController: UserController
    ){
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/api/users', (req, res) => {
            return this.userController.getAll(req,res);
        }); 

        this.router.post('/api/users', (req, res) => {
            return this.userController.save(req,res);
        });

        this.router.get('/api/users/:id', (req, res) => {
            return this.userController.findOne(req,res);
        });

        this.router.delete('/api/users/:id', (req, res) => {
            return this.userController.delete(req,res);
        });
        
        this.router.put('/api/users/:id', (req, res) => {
            return this.userController.update(req,res);
        });
    }

}

export default UserRoute;



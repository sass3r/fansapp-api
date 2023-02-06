import UserService from '../services/user.service';
import User from '../models/user';
import { Response } from 'express';
import { Request } from 'express';

class UserController {
    constructor(private userService: UserService) {}

    async getAll(req: Request, res: Response) {
        const users: never[] = await this.userService.getAll();
        return res.status(200).json(users);
    }

    async save(req: Request, res: Response) {
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const user = new User(email,password);

        const userCreated = await this.userService.save(user);
        return res.status(200).json(userCreated);
    }

    async findOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const user = await this.userService.findOne(id);
        return res.status(200).json(user);
    }

    async delete(req: Request, res: Response) {
        const id: string = req.params.id;
        const user = await this.userService.findOne(id);

        if(!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        const result = await this.userService.delete(id);
        return res.status(200).json(result);
    }

    async update(req: Request, res: Response) {
        const id: string = req.params.id;

        const user = await this.userService.findOne(id);

        if(!user) {
            return res.status(404).json({message: 'User does not exist'});
        }

        const userBody = req.body;
        const userUpdated = await this.userService.update(id, userBody);
        return res.status(200).json(userUpdated);
    }
}

export default UserController;
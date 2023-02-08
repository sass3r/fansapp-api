import UserService from '../services/user.service';
import User from '../models/user';
import { Response } from 'express';
import { Request } from 'express';
import { UserModel } from '../models/user.model';
import * as dotenv from 'dotenv';

class UserController {
    constructor(private userService: UserService) {
        dotenv.config();
    }

    async getAll(req: Request, res: Response) {
        const users: UserModel[] = await this.userService.getAll();
        return res.status(200).json(users);
    }

    async save(req: Request, res: Response) {
        const body = req.body;
        const fullName = body.fullName;
        const nickName = body.nickName;
        const email = body.email;
        const password = body.password;
        const foto = body.foto;
        let user = new User();
        user.fullName = fullName;
        user.nickName = nickName;
        user.email = email;
        user.password = password;
        if(foto) {
            user.foto = foto;
        }

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

    async uploadPhoto(req: Request, res: Response) {
        const apiUrl = process.env.API_URL;
        return res.status(200).json({ url: apiUrl + '/assets/users/' + req.file.originalname});
    }
}

export default UserController;
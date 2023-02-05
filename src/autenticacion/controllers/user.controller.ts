import UserService from '../services/user.service';
import User from '../models/user';
import { Response } from 'express';
import { Request } from 'express';

class UserController {
    constructor(private userService: UserService) {}

    getAll(req: Request, res: Response) {
        const users: [] = this.userService.getAll();
        return res.status(200).json({ users });
    }

    save(req: Request, res: Response) {
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const user = new User(email,password);

        const result = this.userService.save(user);
        return res.status(200).json({ result });
    }

    findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const user = this.userService.findOne(id);
        return res.status(200).json({ user });
    }

    delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const result = this.userService.delete(id);
        return res.status(200).json({ result });
    }

    update(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const user = new User(email,password);

        const result = this.userService.update(id, user);
        return res.status(200).json({ result });
    }
}

export default UserController;
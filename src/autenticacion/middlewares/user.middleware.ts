import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../models/user.dto';

export class UserMiddleware {
    userValidator(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body;
        
        const valid = new UserDTO();

        valid.email = email;
        valid.password = password;

        validate(valid).then((err) => {
            if(err.length > 0) {
                res.status(422).json({error: 'Error de validacion de datos'});
            }

            if(err.length == 0) {
                next();
            }
        });
    }

    userIdValidator(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
       
        if(id.length < 24 || id.length > 24) {
            res.status(422).json({error: 'Error de validacion de datos'});
        }

        if(id.length == 24) {
            next();
        }

    }
}
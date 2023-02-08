import { NextFunction } from 'express';
import passport from 'passport';
import { UserModel } from '../models/user.model';
import { Request, Response } from 'express';

export class SharedMiddleware {
    constructor() {}

    passAuth(type: string) {
        return passport.authenticate(type, {session: false});
    }

    idValidator(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
       
        if(id.length < 24 || id.length > 24) {
            res.status(422).json({error: 'Error de validacion de datos'});
        }

        if(id.length == 24) {
            next();
        }

    }
}

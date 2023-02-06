import { NextFunction } from 'express';
import passport from 'passport';
import { UserModel } from '../models/user.model';
import { Request, Response } from 'express';

export class SharedMiddleware {
    constructor() {}

    passAuth(type: string) {
        return passport.authenticate(type, {session: false});
    }
}

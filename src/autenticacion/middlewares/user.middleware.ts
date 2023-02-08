import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../models/user.dto';
import { LoginDTO } from '../models/login.dto'; 
import multer, { DiskStorageOptions, Multer, StorageEngine } from 'multer';

export class UserMiddleware {
    storage: StorageEngine;
    upload: Multer;

    constructor() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/users/');
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, file.originalname);
            }
        });

        this.upload = multer({storage: this.storage, fileFilter: this.fileFilter});
    }

    loginValidator(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body;
        
        const valid = new LoginDTO();

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

    userValidator(req: Request, res: Response, next: NextFunction){
        const { fullName, nickName, email, password } = req.body;
        
        const valid = new UserDTO();

        valid.fullName = fullName;
        valid.nickName = nickName;
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
    
    fileFilter(req: any, file: any, cb: any) {
        if(file.mimetype == "image/jpg"  ||
           file.mimetype == "image/jpeg" ||
           file.mimetype == "image/png") {
        cb(null, true)
        }else{
            cb(new Error('Image uploaded is not of type jpg/jpeg or png'),false);
        }
    }
}
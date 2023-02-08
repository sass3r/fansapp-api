import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { PersonajeDTO } from '../models/personaje.dto';

export class PersonajeMiddleware {

    personajeValidator(req: Request, res: Response, next: NextFunction){
        const { nombre, imagen, calificacion, comentario, user } = req.body;        
        const valid = new PersonajeDTO();

        valid.nombre = nombre;
        valid.imagen = imagen;
        valid.calificacion = calificacion;
        valid.comentario = comentario;
        valid.user = user;

        validate(valid).then((err) => {
            if(err.length > 0) {
                res.status(422).json({error: 'Error de validacion de datos'});
            }

            if(err.length == 0) {
                next();
            }
        });
    }
}
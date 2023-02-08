import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../models/personaje';
import { Response } from 'express';
import { Request } from 'express';
import { PersonajeModel } from '../models/personaje.model';
import * as dotenv from 'dotenv';

export class PersonajeController {
    constructor(private personajeService: PersonajeService) {
        dotenv.config();
    }

    async getAll(req: Request, res: Response) {
        const personajes: PersonajeModel[] = await this.personajeService.getAll();
        return res.status(200).json(personajes);
    }

    async save(req: Request, res: Response) {
        const body = req.body;
        const nombre = body.nombre;
        const imagen = body.imagen;
        const calificacion = body.calificacion;
        const comentario = body.comentario;
        const user = body.user;
        let personaje = new Personaje();
        personaje.nombre = nombre;
        personaje.imagen = imagen;
        personaje.calificacion = calificacion;
        personaje.comentario = comentario;
        personaje.user = user;

        const personajeCreated = await this.personajeService.save(personaje);
        return res.status(200).json(personajeCreated);
    }

    async findOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const personaje = await this.personajeService.findOne(id);
        return res.status(200).json(personaje);
    }

    async findByUser(req: Request, res: Response) {
        const id: string = req.params.id;
        const personajes = await this.personajeService.findByUser(id);
        return res.status(200).json(personajes);
    }

    async delete(req: Request, res: Response) {
        const id: string = req.params.id;
        const personaje = await this.personajeService.findOne(id);

        if(!personaje) {
            return res.status(404).json({message: 'Character does not exist'});
        }

        const result = await this.personajeService.delete(id);
        return res.status(200).json(result);
    }

    async update(req: Request, res: Response) {
        const id: string = req.params.id;

        const personaje = await this.personajeService.findOne(id);

        if(!personaje) {
            return res.status(404).json({message: 'Character does not exist'});
        }

        const personajeBody = req.body;
        const personajeUpdated = await this.personajeService.update(id, personajeBody);
        return res.status(200).json(personajeUpdated);
    }
}
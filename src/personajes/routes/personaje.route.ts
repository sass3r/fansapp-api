import { Router } from 'express';
import { PersonajeService } from '../services/personaje.service';
import { PersonajeController } from '../controllers/personaje.controller';
import { PersonajeMiddleware } from '../middlewares/personaje.middleware';
import { SharedMiddleware } from '../../autenticacion/middlewares/shared.middleware';

export class PersonajeRoute {

    public router: Router;

    constructor(
        private personajeService: PersonajeService,
        private personajeController: PersonajeController,
        private middleware: PersonajeMiddleware,
        private sharedMiddleware: SharedMiddleware
    ){
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get(
            '/api/personajes',
            this.sharedMiddleware.passAuth('jwt'), 
            (req, res) => this.personajeController.getAll(req,res)
        ); 

        this.router.post(
            '/api/personajes',
            this.sharedMiddleware.passAuth('jwt'), 
            (req, res, next) => [this.middleware.personajeValidator(req, res, next)], 
            (req, res) => this.personajeController.save(req,res)
        );

        this.router.get(
            '/api/personajes/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)],
            (req, res) => this.personajeController.findOne(req,res)
        );

        this.router.get(
            '/api/personajes/usuario/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)],
            (req, res) => this.personajeController.findByUser(req,res)
        );

        this.router.delete(
            '/api/users/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)],
            (req, res) => this.personajeController.delete(req,res)
        );
        
        this.router.put(
            '/api/users/:id',
            this.sharedMiddleware.passAuth('jwt'),
            (req, res, next) => [this.sharedMiddleware.idValidator(req, res, next)], 
            (req, res) => this.personajeController.update(req,res)
        );
    }

}


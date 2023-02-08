import express, { Router } from 'express';
import routes from './routes';
import UserRoute from './autenticacion/routes/user.route';
import UserController from './autenticacion/controllers/user.controller';
import UserService from './autenticacion/services/user.service';
import UserSchema from './autenticacion/models/user.schema';
import { UserMiddleware } from './autenticacion/middlewares/user.middleware';
import { LoginStrategy } from './autenticacion/strategies/login.strategy';
import { JwtStrategy } from './autenticacion/strategies/jwt.strategy';
import { AuthService } from './autenticacion/services/auth.service';
import { AuthController } from './autenticacion/controllers/auth.controller';
import { SharedMiddleware } from './autenticacion/middlewares/shared.middleware';
import { AuthRoute } from './autenticacion/routes/auth.route';
import cors from 'cors';
import { join } from 'path';
import { PersonajeRoute } from './personajes/routes/personaje.route';
import { PersonajeSchema } from './personajes/models/personaje.schema';
import { PersonajeService } from './personajes/services/personaje.service';
import { PersonajeController } from './personajes/controllers/personaje.controller';
import { PersonajeMiddleware } from './personajes/middlewares/personaje.middleware';


class App {
    public server;
    private userRouter: Router;
    private authRouter: Router;
    private personajeRouter: Router;
    private userSchema: UserSchema;
    private userService: UserService;
    private authService: AuthService;
    private sharedMiddleware: SharedMiddleware;

    constructor() {
        const assets = join(__dirname, '..', 'public');
        this.sharedMiddleware = new SharedMiddleware();
        this.server = express();
        this.server.use('/assets', express.static(assets));
        this.middlewares();
        this.buildUserRoutes();
        this.buildPersonajeRoutes();
        this.passportUse();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(cors());
        this.server.use(routes);
        this.server.use(this.userRouter);
        this.server.use(this.authRouter);
        this.server.use(this.personajeRouter);
    }

    passportUse() {
        return [new LoginStrategy().use,new JwtStrategy().use]
    }

    buildPersonajeRoutes() {
        const personajeSchema: PersonajeSchema = PersonajeSchema.getInstance();
        const personajeService: PersonajeService = new PersonajeService(personajeSchema);
        const personajeController: PersonajeController = new PersonajeController(personajeService);
        const personajeMiddleware: PersonajeMiddleware = new PersonajeMiddleware();
        const personajeRouter: PersonajeRoute = new PersonajeRoute(personajeService,personajeController,personajeMiddleware,this.sharedMiddleware);
        this.personajeRouter = personajeRouter.router;
    }

    buildUserRoutes() {
        const userMiddleware: UserMiddleware = new UserMiddleware();
        this.userSchema = UserSchema.getInstance();
        this.userService = new UserService(this.userSchema);
        const userController: UserController = new UserController(this.userService);
        const userRoute: UserRoute = new UserRoute(this.userService,userController,userMiddleware,this.sharedMiddleware);
        this.userRouter = userRoute.router;
        this.authService = new AuthService(this.userService);
        const authController: AuthController = new AuthController(this.authService);
        const authRouter: AuthRoute = new AuthRoute(authController,this.sharedMiddleware,userMiddleware);
        this.authRouter = authRouter.router;
    }

    listen(port: number) {
        this.server.listen(port);
    }
}

export default App;
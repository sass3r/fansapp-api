import express, { Router } from 'express';
import routes from './routes';
import UserRoute from './autenticacion/routes/user.route';
import UserController from './autenticacion/controllers/user.controller';
import UserService from './autenticacion/services/user.service';

class App {
    public server;
    private userRouter: Router;

    constructor() {
        this.server = express();
        this.middlewares();
        this.buildUserRoutes();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
        this.server.use(this.userRouter);
    }

    buildUserRoutes() {
        const userService: UserService = new UserService();
        const userController: UserController = new UserController(userService);
        const userRoute: UserRoute = new UserRoute(userService,userController);
        this.userRouter = userRoute.router;
    }

    listen(port: number) {
        this.server.listen(port);
    }
}

export default App;
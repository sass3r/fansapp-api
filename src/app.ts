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

class App {
    public server;
    private userRouter: Router;
    private authRouter: Router;
    private userSchema: UserSchema;
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.server = express();
        this.middlewares();
        this.buildUserRoutes();
        this.passportUse();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
        this.server.use(this.userRouter);
        this.server.use(this.authRouter);
    }

    passportUse() {
        return [new LoginStrategy().use,new JwtStrategy().use]
    }

    buildUserRoutes() {
        const userMiddleware: UserMiddleware = new UserMiddleware();
        this.userSchema = UserSchema.getInstance();
        this.userService = new UserService(this.userSchema);
        const userController: UserController = new UserController(this.userService);
        const sharedMiddleware: SharedMiddleware = new SharedMiddleware();
        const userRoute: UserRoute = new UserRoute(this.userService,userController,userMiddleware,sharedMiddleware);
        this.userRouter = userRoute.router;
        this.authService = new AuthService(this.userService);
        const authController: AuthController = new AuthController(this.authService);
        const authRouter: AuthRoute = new AuthRoute(authController,sharedMiddleware);
        this.authRouter = authRouter.router;
    }

    listen(port: number) {
        this.server.listen(port);
    }
}

export default App;
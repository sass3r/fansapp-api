import App  from './app';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoConnection from './db';

(async () => {
    dotenv.config();
    const mongoConnection: MongoConnection = MongoConnection.getInstance();
    console.log(mongoConnection.connection);
    const app = new App();
    app.listen(8080);
})();
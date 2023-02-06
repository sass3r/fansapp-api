import App  from './app';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoConnection from './db';

(async () => {
    dotenv.config();
    /*await mongoose.connect(process.env.MONGODB_URI, ()=> {
        console.log("Connected to mongodb");
    });*/
    const mongoConnection: MongoConnection = MongoConnection.getInstance();
    console.log(mongoConnection.connection);
    const app = new App();
    app.listen(8080);
})();
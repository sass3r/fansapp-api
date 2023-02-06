import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

class MongoConnection {
    static instance: MongoConnection;
    public connection: any;

    private constructor() {
        dotenv.config();
        this.connection = mongoose.connect(process.env.MONGODB_URI,() => {
            console.log('Connected to mongodb');
        });
    }

    public static getInstance() {
        if(!this.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }
}

export default MongoConnection;
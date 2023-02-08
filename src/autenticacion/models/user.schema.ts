import mongoose from 'mongoose';
import { Schema, Model, Document } from 'mongoose';
import { UserModel } from './user.model';
import UserInterface from './user.interface';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

class UserSchema {
    static instance: UserSchema;
    static userModel: Model<UserModel>;
    userSchema: Schema<UserModel>;

    private constructor() {
        dotenv.config();
        this.userSchema = new mongoose.Schema({
            fullName: {
                type: String,
                required: true
            },
            nickName: {
                type: String,
                required: true,
                index: {
                    unique: true
                }
            },
            foto: {
                type: String,
            },
            email: {
                type: String,
                required: true,
                index: {
                    unique: true
                }
            },
            password: {
                type: String,
                required: true,
            }
        });

        this.schemaMethods();
        this.preSave();
        UserSchema.userModel = mongoose.model<UserModel>('User', this.userSchema);

    }

    public static getInstance() {
        if(!this.instance) {
            UserSchema.instance = new UserSchema();
        }
        return UserSchema.instance;
    }

    async preSave() {
        this.userSchema.pre('save', async function (next) {
            const user = this;
            const salt: number = parseInt(process.env.SALT_WORK_FACTOR);
            if(this.isModified('password')) {
                const saltFactor = await bcrypt.genSalt(salt);
                const hashPassword = await bcrypt.hash(user.password, saltFactor);
                user.password = hashPassword;
            } 
            next();
        });
    }

    schemaMethods() {
        this.userSchema.methods.comparePassword = async function (this: UserModel, password: string): Promise<boolean> {
            if(this) {
                const result: boolean = await bcrypt.compare(password, this.password);
                return result;
            }
        }
    }


    async create(attr: UserInterface) {
        try {
            const user: UserModel = await UserSchema.userModel.create(attr);
            return user;
        }catch(error){
            console.log('campo duplicado');
        }
    }
}

export default UserSchema;
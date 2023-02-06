import User from "../models/user";
import UserSchema from "../models/user.schema";
import { UserModel } from "../models/user.model";

class UserService {
    public users: never[];

    constructor(private userSchema: UserSchema) {}

    async getAll() {
        this.users = await UserSchema.userModel.find();
        return this.users;
    }

    async save(user: User) {
        const newUser = await this.userSchema.create(user);
        return newUser;
    }

    async findOne(id: string) {
        const user = await UserSchema.userModel.findOne({_id: id});
        return user;
    }

    async findByEmail(email: string) {
        const user = await UserSchema.userModel.findOne({email: email});
        return user;
    }

    async delete(id: string) {
        await UserSchema.userModel.findByIdAndDelete(id);
        return { message: 'success' };
    }

    async update(id: string, params: User) {
        const user: UserModel = await this.findOne(id);
        
        await UserSchema.userModel.updateOne({_id: id}, params);
        const userUpdated = await this.findOne(id);

        return userUpdated;
    }
}

export default UserService;
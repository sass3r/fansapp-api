import User from "../models/user";
import UserSchema from "../models/user.schema";
import { UserModel } from "../models/user.model";

class UserService {

    constructor(private userSchema: UserSchema) {}

    async getAll() {
        return await UserSchema.userModel.find().select('-password');
    }

    async save(user: User) {
        const newUser = await this.userSchema.create(user);
        return newUser;
    }

    async findOne(id: string) {
        return await UserSchema.userModel.findOne({_id: id}).select('-password');
    }

    async findByEmail(email: string) {
        return await UserSchema.userModel.findOne({email: email});
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
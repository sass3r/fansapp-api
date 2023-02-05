import User from "../models/user";

class UserService {
    public users: [] = [];

    constructor() {

    }

    getAll() {
        return this.users;
    }

    save(user: User) {
        return { message: 'success' };
    }

    findOne(id: number) {
        return { email: 'rudyrafaelrc@gmail.com' };
    }

    delete(id: number) {
        return { message: 'success' };
    }

    update(id: number, user: User) {
        return { message: 'success' };
    }
}

export default UserService;
import UserInterface from "./user.interface";

class User implements UserInterface {
    fullName: string;
    nickName: string;
    email: string;
    password: string;
    foto: string;

    constructor() {
        this.fullName = "";
        this.nickName = "";
        this.email = "";
        this.password = "";
        this.foto = "";
    }
}

export default User;
import UserInterface from "./user.interface";

class User implements UserInterface {
    constructor( 
        public email: string,
        public password: string,
    ) {}
}

export default User;
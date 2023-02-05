class User {

    constructor( 
        private email: String,
        private password: String
    ) {}

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }
}

export default User;
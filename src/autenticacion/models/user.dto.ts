import { IsNotEmpty, Length } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    fullName!: string;
 
    @IsNotEmpty()
    nickName!: string;

    @IsNotEmpty()
    email!: string;
 
    @IsNotEmpty()
    password!: string;
}
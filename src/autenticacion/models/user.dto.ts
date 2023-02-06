import { IsNotEmpty, Length } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    email!: string;
 
    @IsNotEmpty()
    password!: string;
}
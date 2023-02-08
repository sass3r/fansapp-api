import { IsNotEmpty, Length } from "class-validator";

export class PersonajeDTO {
    @IsNotEmpty()
    nombre!: string;
 
    @IsNotEmpty()
    imagen!: string;

    @IsNotEmpty()
    calificacion!: number;
 
    @IsNotEmpty()
    comentario!: string;

    @IsNotEmpty()
    user!: string;
}
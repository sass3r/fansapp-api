import { PersonajeInterface } from "./personaje.interface";

export class Personaje implements PersonajeInterface {
    nombre: string;
    imagen: string;
    calificacion: string;
    comentario: string;
    user: string;

    constructor() {
        this.nombre = "";
        this.imagen = "";
        this.calificacion = "";
        this.comentario = "";
        this.user = "";
    }
}
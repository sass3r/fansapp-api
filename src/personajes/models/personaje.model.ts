import { Document } from "mongoose";
import { PersonajeInterface } from "./personaje.interface";

export interface PersonajeModel extends PersonajeInterface, Document {
}
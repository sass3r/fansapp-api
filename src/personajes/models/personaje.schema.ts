import mongoose from 'mongoose';
import { Schema, Model, Document } from 'mongoose';
import { PersonajeModel } from './personaje.model';
import { PersonajeInterface } from './personaje.interface';
import * as dotenv from 'dotenv';

export class PersonajeSchema {
    static instance: PersonajeSchema;
    static personajeModel: Model<PersonajeModel>;
    personajeSchema: Schema<PersonajeModel>;

    private constructor() {
        dotenv.config();
        this.personajeSchema = new mongoose.Schema({
            nombre: {
                type: String,
                required: true
            },
            imagen: {
                type: String,
                required: true
            },
            calificacion: {
                type: String,
                required: true,
            },
            comentario: {
                type: String,
                required: true,
            },
            user: {
                type: String,
                required: true,
            }
        });

        PersonajeSchema.personajeModel = mongoose.model<PersonajeModel>('Personaje', this.personajeSchema);

    }

    public static getInstance() {
        if(!this.instance) {
            PersonajeSchema.instance = new PersonajeSchema();
        }
        return PersonajeSchema.instance;
    }

    async create(attr: PersonajeInterface) {
        const personaje: PersonajeModel = await PersonajeSchema.personajeModel.create(attr);
        return personaje;
    }
}
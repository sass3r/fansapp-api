import { Personaje } from "../models/personaje";
import { PersonajeSchema } from "../models/personaje.schema";
import { PersonajeModel } from "../models/personaje.model";

export class PersonajeService {

    constructor(private personajeSchema: PersonajeSchema) {}

    async getAll() {
        return await PersonajeSchema.personajeModel.find();
    }

    async save(personaje: Personaje) {
        const newPersonaje = await this.personajeSchema.create(personaje);
        return newPersonaje;
    }

    async findOne(id: string) {
        return await PersonajeSchema.personajeModel.findOne({_id: id});
    }

    async delete(id: string) {
        await PersonajeSchema.personajeModel.findByIdAndDelete(id);
        return { message: 'success' };
    }

    async update(id: string, params: Personaje) {
        const personaje: PersonajeModel = await this.findOne(id);
        
        await PersonajeSchema.personajeModel.updateOne({_id: id}, params);
        const personajeUpdated = await this.findOne(id);

        return personajeUpdated;
    }

    async findByUser(id: string) {
        return await PersonajeSchema.personajeModel.find({user: id});
    }
}
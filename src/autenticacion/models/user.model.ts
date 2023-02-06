import { Document } from "mongoose";
import UserInterface from "./user.interface";

export interface UserModel extends UserInterface, Document {
    comparePassword(password: string): boolean;
}
import mongoose, { Schema, Types } from "mongoose";
export interface Iuser extends Document {
    _id: any;
    name: string,
    email: string,
    password: string

}
const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })
const User = mongoose.model<Iuser>("user", userSchema)
export default User;
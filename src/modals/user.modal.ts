import mongoose, { Schema, Types } from "mongoose";
export interface Iuser extends Document {
    _id: any;
    name: string,
    email: string,
    password: string,
    role: "admin" | "employee";

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
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default:"employee"
    }

}, { timestamps: true })
const User = mongoose.model<Iuser>("user", userSchema)
export default User;
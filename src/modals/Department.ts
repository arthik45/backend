import mongoose, { Schema, Types } from "mongoose";

export interface Department{
    departmentid: any,
    department_name:string,

}
const departmentschema = new Schema<Department>({
    departmentid: {
        type: String,
        required:true
    },
    department_name: {
        type: String,
        required:true
    },
})
const Department = mongoose.model<Department>("Department", departmentschema)
export default Department;
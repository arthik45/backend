import mongoose, { Schema, Types } from "mongoose";

export interface Employee {
    employeeid: any,
    userId: Types.ObjectId;
    name: string,
    email: string,
    password:string,
    phone: string,
    department: string,
    designation: string,
    salary: string,
    joiningDate: Date,
    profileImage: string,
    status: Boolean,
}
const employeeSchema = new Schema<Employee>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    employeeid: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    department: {
        type: String,
    },
    designation: {
        type:String
    },
    salary: {
        type: String,
    },
    joiningDate: {
        type: Date,
    },
    status: {
        type: Boolean,
        default:false
    }

})
const Employee = mongoose.model<Employee>("Employee", employeeSchema)
export default Employee;
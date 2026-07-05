import mongoose, { Schema, Types } from "mongoose";

export interface Attendance {
    employeeid: any,
    checkIn: Date,
    checkOut: Date,
    date: Date,
    status: string,
    workingHour: number,
    remarks: string,
    dayType: string
}
const AttendanceSchema = new Schema<Attendance>({
    employeeid: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        default: null,
    },
    checkOut: {
        type: Date,
        default: null,

    },
    date: {
        type:Date,
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        default: "Present"
    },
    workingHour: {
        type: Number,
        default: null
    },
    remarks: {
        type: String,
    },
    dayType: {
        type: String,
        enum: ["Half day", "Full day", "Leave"],
        default: "Full day"
    },

})
const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
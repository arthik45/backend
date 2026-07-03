import mongoose, { Schema, Types } from "mongoose";
export interface Leave {
    employeeid: any,
    leaveid: any,
    leavetype: string[],
    fromDate: Date,
    toDate: String,
    reason: string,
    status: boolean,
    appliedAt: Date
}
const leaveSchema = new Schema<Leave>({
    employeeid: {
        type: String,
        required: true,
    },
    leaveid: {
        type: String,
        required: true,
        unique: true
    },
    leavetype:
        { type: [String], enum: ["casual", "sick", "vacation"], required: true },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    appliedAt: {
        type: Date,
    }

})
const Leave = mongoose.model<Leave>("Leave", leaveSchema)
export default Leave;
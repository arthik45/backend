import Employee from "../modals/Employee";
import { Request, Response } from "express"
import Leave from "../modals/Leave";

export const applyLeave = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { employeeid, leavetype, fromDate, toDate, reason } = req.body;
        const session = req.session;
        const employee = await Employee.findOne({ userId: employeeid })
        if (!employee) {
            return res.status(500).json({message:"Employee not excit"})
        }
        const leaveid = `LEV${Date.now()}`;
        console.log(leaveid,"jhhg")
        const leave = await Leave.create({
            leaveid,employeeid,leavetype,fromDate,toDate,reason,appliedAt:new Date(),
        })
        res.status(201).json({massage:"Leave applyed successfully",leave})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

}
export const approveLeave = async (req: Request, res: Response) => {
    try {
        const { leaveId } = req.body;

        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        leave.status = true;
        await leave.save();

        res.status(200).json({
            message: "Leave approved successfully",
            leave,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

}
export const getLeaves = async (req: Request, res: Response) => {
    try {
        const leave = await Leave.find()
        if (!leave) {
            return res.status(500).json({message:"leave not found"})
        }
       
        res.status(201).json({ massage: "success", leave })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

}
export const getLeavebuid = async (req: Request, res: Response) => {
    try {
        const{employeeid}=req.params
        const leave = await Leave.find({ employeeid: employeeid })
        if (!leave) {
            return res.status(500).json({message:"leave not found"})
        }
       
        res.status(201).json({ massage: "successss", leave })

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

}

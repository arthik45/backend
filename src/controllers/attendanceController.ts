import Employee from "../modals/Employee";
import { Request, Response } from "express"
import Attendance from "../modals/Attendance";

export const checkIn = async (req: Request, res: Response) => {
    try {
        const { employeeid } = req.body;
        const employee = await Employee.findOne({employeeid});
        console.log(employeeid,"emplojhh")
        if (!employee) {
            return res.status(204).json({message:"Employee not found"})
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        console.log(today,"today")
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        console.log(endOfDay,"endOfDay")
        
        const extistingattendance = await Attendance.findOne({
            employeeid,
            date: {
                $gte: today,
                $lte: endOfDay,
            },
        });
        console.log(extistingattendance,"extistingattendance")
        const now = new Date();
        if (!extistingattendance) {
            const isLate =
            now.getHours() > 9 ||
            (now.getHours() === 9 && now.getMinutes() > 0);
            console.log(isLate,"isLate")
            const attendance = await Attendance.create({
                employeeid,
                checkIn:now,
                date: today,
                status: isLate ? "Late" :"Present"
            })
            console.log(attendance);
            return res.status(201).json({ success: true, message: "Check-in successful", data: attendance, });
        } else if (!extistingattendance.checkOut) {
            let checkintime = new Date(extistingattendance.checkIn).getTime()
            console.log(checkintime,"checkintime")
            let diffmin = now.getTime() - checkintime;
            console.log(diffmin,"diffmin")
            let diffhour = diffmin / (1000 * 60 * 60)
            console.log(diffhour,"diffhour")
            extistingattendance.checkOut = now;
            let workinghrs = parseFloat(diffhour.toFixed(2))
            let daytpe = "Full day"
            if (workinghrs > 8) {
                daytpe="Full day"
            } else if (workinghrs > 4) {
                daytpe="Half day"
            } else {
                daytpe="Leave"
            }
            extistingattendance.workingHour = workinghrs;
            extistingattendance.dayType = daytpe;
            await extistingattendance.save()
            res.status(201).json({ success: true, message: "Check-out successful", data: extistingattendance, });
        } else {
            return res.status(400).json({
                success: false,
                message: "Already checked out for today",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
export const getAttendance = async (req: Request, res: Response) => {
    try {
        const { employeeid } = req.body;
        const employee = await Employee.findOne({employeeid});
        console.log(employeeid,"emplojhh")
        if (!employee) {
            return res.status(204).json({message:"Employee not found"})
        }
        const limit = 30;
        const attendance = await Attendance.findOne({ employeeid });
        res.status(500).json({ success: false, message: "success", data: attendance });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
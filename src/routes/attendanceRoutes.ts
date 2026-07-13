import express from "express"
import { checkIn,getAttendance ,getAttendancebyid} from "../controllers/attendanceController"
const attendanceRoutes = express.Router()
attendanceRoutes.post("/attendance/checkIn", checkIn)
attendanceRoutes.get("/allattendance", getAttendance)
attendanceRoutes.get("/allattendance/:employeeid", getAttendancebyid)
export default attendanceRoutes;
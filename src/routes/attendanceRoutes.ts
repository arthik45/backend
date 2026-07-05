import express from "express"
import { checkIn,getAttendance } from "../controllers/attendanceController"
const attendanceRoutes = express.Router()
attendanceRoutes.post("/attendance/checkIn", checkIn)
attendanceRoutes.get("/allattendance", getAttendance)
export default attendanceRoutes;
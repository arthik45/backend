import express from "express"
import { createdepartment,getdepartmentList,deletedepartment } from "../controllers/departmentController"
const departRoutes = express.Router()
departRoutes.post("/createdepartment", createdepartment)
departRoutes.get("/department", getdepartmentList)
departRoutes.delete("/deletedepartment/:id", deletedepartment)
export default departRoutes;
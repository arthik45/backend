import { createEmployee,updateEmployee,deleteEmployee,getEmployeeList } from "../controllers/employeeController";
import express from "express"
const employeeRouter = express.Router();
employeeRouter.post("/addemployee", createEmployee)
employeeRouter.put("/addemployee/:id", updateEmployee)
employeeRouter.delete("/deleteemployee/:id", deleteEmployee)
employeeRouter.get("/employees", (req, res, next) => {
    console.log("employee route hitting")
    next()
}, getEmployeeList)
export default employeeRouter;

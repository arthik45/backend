import { createEmployee,updateEmployee,deleteEmployee,getEmployeeList } from "../controllers/employeeController";
import express from "express"
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
const employeeRouter = express.Router();
employeeRouter.post("/addemployee", authenticate, authorize("admin"), createEmployee)
employeeRouter.put("/addemployee/:id", authenticate, authorize("admin"), updateEmployee)
employeeRouter.delete("/deleteemployee/:id", authenticate, authorize("admin"), deleteEmployee)
employeeRouter.get("/employees", (req, res, next) => {
    console.log("employee route hitting")
    next()
}, authenticate, authorize("admin"), getEmployeeList)
export default employeeRouter;

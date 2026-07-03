import { applyLeave,approveLeave,getLeaves,getLeavebuid } from "../controllers/leaveController";
import express from "express"
const leaveRouter = express.Router();
leaveRouter.post("/applyleave", applyLeave)
leaveRouter.post("/approveleave/", approveLeave)
// leaveRouter.delete("/deleteemployee/:id", deleteEmployee)
leaveRouter.get("/leaves", getLeaves)
leaveRouter.get("/leaves/:id", getLeavebuid)
export default leaveRouter;
import { registerUser ,loginUser} from "../controllers/auth.controller";
import express from "express"
const authRouter = express.Router();
authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
export default authRouter;
import express from "express";
import cors from "cors";
import connectdb from "./config/db";
import dotenv from 'dotenv'
import authRouter from "./routes/auth.routes";
import employeeRouter from "./routes/employeeRoutes";
import leaveRouter from "./routes/leaveRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import departRoutes from "./routes/departmentRoutes";
dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next()
})
app.get("/", (req,res) => {
    res.send("server is running")
    console.log("server is running")
})
app.use("/api",authRouter)
app.use("/api", employeeRouter)
app.use("/api", leaveRouter)
app.use("/api", attendanceRoutes)
app.use("/api", departRoutes)

const startServer = async () => {
    await connectdb()
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

startServer().catch((error) => {
    console.log("Server failed to start", error)
})

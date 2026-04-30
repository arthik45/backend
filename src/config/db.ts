import mongoose from "mongoose";
const connectdb = async (): Promise<void>=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("DB connected")
    } catch (error) {
        console.log("DB connection failed",error)
    }
    
}
export default connectdb;
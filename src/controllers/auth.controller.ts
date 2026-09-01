import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { Iuser } from "../modals/user.modal"
import { Request, Response } from "express"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All Field is required" })
        }
        const excistingUser = await User.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            return res.status(400).json({ message: "Invalid user" })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hash,
            role: role || "employee",
        })
        res.status(201).json({
            message: "register successfully",
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }

}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password,role } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All filed is required"
            })
        }
        const user: Iuser | null = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: " user not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "7d" })
        res.status(200).json({
            message: "Login successfully", token, user: {
                userId: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
        console.log(token, "token")

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const session = (req: Request, res: Response) => {
    const session = req.session;
    return res.json({user:session})

    
}
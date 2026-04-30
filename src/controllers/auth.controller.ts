import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { Iuser } from "../modals/user.modal"
import { Request, Response } from "express"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(500).json({message:"All Field is required"})
        }
        const excistingUser = await User.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            return res.status(400).json({message:"Invalid user"})
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hash
        })
        res.status(201).json({message:"register successfully",user})
    } catch(error) {
        res.status(500).json({message:"Server error",error})
    }
    
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({message:"All filed is required"
            })
        }
        const user: Iuser | null = await User.findOne({ email });
        if (!user) {
           return res.status(400).json({message:" user not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Password"})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
        res.status(200).json({message:"Login successfully",token,user})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

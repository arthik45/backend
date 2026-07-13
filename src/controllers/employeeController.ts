import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Employee from "../modals/Employee"
import { Request, Response } from "express"
import User from "../modals/user.modal"


export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, department, designation, salary, joiningDate, profileImage } = req.body;
        if (!name || !email || !phone || !department) {
            return res.status(500).json({
                message: "All fields is required"
            })
        }

        const isuser = await User.findOne({ email })
        console.log(isuser, "jjjh")
        if (isuser) {
            return res.json({ message: "user already excist" })
        }
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hash
        })
        const employeeid = "EMP" + Date.now();
        const employee = await Employee.create({
            employeeid,
            name,
            email,
            password: hash,
            phone,
            department,
            designation,
            salary,
            profileImage
        })
        console.log(employee, "kkkkk")
        res.status(201).json({ message: "Employee create successfully", employee })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }

}



export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password, phone, department, designation, salary, joiningDate, profileImage } = req.body;
        const isexcit = await Employee.findOne({ employeeid: id })
        if (!isexcit) {
            return res.json({ message: "Employee not found" })
        }
        const updatedEmployee = await Employee.findOneAndUpdate({ employeeid: id }, req.body)
        res.status(200).json({ message: "Employee updated successfully", updatedEmployee })
    } catch (error) {
        res.status(500).json({ message: "Internal error", error })
    }

}

export const deleteEmployee = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params
        const employee = await Employee.findOneAndDelete({ _id: id })
        if (!employee) {
            return res.status(404).json({ message: "Employee was not found" })
        }
        res.status(204).json({message: "Employee Deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
export const getEmployeeList = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.find()
        if (!employee) {
            return res.status(404).json({ message: "Employees was not found" })
        }
        res.json({ message: "Success", count: employee.length, data: employee })
    } catch (error) {
        res.status(500).json({ message: "server error", error })
    }
}
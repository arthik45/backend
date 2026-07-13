import { start } from "node:repl";
import Department from "../modals/Department";
import { Request, Response } from "express"

export const createdepartment = async (req: Request, res: Response) => {
    try {
        const { department_name } = req.body;
        const isexcist = await Department.findOne({ department_name })
        if (isexcist) {
            return res.status(404).json({message:"department already excit"})
        }
        const departmentid = "DEPT" + Date.now();
        const department=await Department.create({departmentid,department_name})
        res.status(201).json({message:"Department created successfully",department})
    } catch (err) {
        console.log(err)
    }
}
export const deletedepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const isexcist = await Department.findOneAndDelete({ _id: id })
        if (!isexcist) {
            return res.status(404).json({message:"department not fount"})
        }
        const department=await Department.deleteOne(isexcist)
        res.status(201).json({message:"Department deleted successfully"})
    } catch (err) {
        console.log(err)
    }
}
export const getdepartmentList = async (
    req: Request,
    res: Response
) => {
    try {
        const department = await Department.find();

        if (department.length === 0) {
            return res.status(404).json({
                message: "No departments found",
            });
        }

        res.status(200).json({
            message: "Departments fetched successfully",
            data: department,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
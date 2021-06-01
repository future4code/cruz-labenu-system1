import {Request, Response} from 'express'
import student from '../types/student'
import studentModel from '../model/studentModel'
import {v4 as uuidv4} from 'uuid'
const StudentController = {
    create: async (req: Request, res: Response):Promise<any> => {
        try{
            const {name, birth_date, email}:student = req.body;
            const id = uuidv4();
            const dbResult = await studentModel.create({id, name, birth_date, email})
            console.log(dbResult)
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                throw new Error("Student not created")
            }
            res.send({message: "New student created"})
        }
        catch(err){
            res.send({message: err.message})
        }
    }
} 
export default StudentController
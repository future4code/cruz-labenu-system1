import {Request, Response} from 'express'
import teacher from '../types/teacher'
import teacherModel from '../model/teacherModel'
import {v4 as uuidv4} from 'uuid'
const teacherController = {
    create: async (req: Request, res: Response):Promise<any> => {
        try{
            const {name, birth_date, email}:teacher = req.body;
            const id = uuidv4();
            const dbResult = await teacherModel.create({id, name, birth_date, email})
            
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                throw new Error("teacher not created")
            }
            res.send({message: "New teacher created"})
        }
        catch(err){
            res.send({message: err.message})
        }
    }
} 
export default teacherController
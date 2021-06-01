import {Request, Response} from 'express'
import registration from '../types/linked'
import linkedModel from '../model/linkedModel'

const linkedController = {
    studentTheClass: async (req: Request, res: Response):Promise<any> => {
        try{
            const {fk_student_id, fk_class_id }:registration = req.body;
            
            const dbResult = await linkedModel.linkTheClass({fk_class_id, fk_student_id})
            
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                throw new Error("Unable to complete registration")
            }
            res.send({message: "Registration completed"})
        }
        catch(err){
            res.send({message: err.message})
        }
    },
    teacherTheClass: async (req: Request, res: Response):Promise<any> => {
        try{
            const {fk_class_id, fk_teacher_id }:registration = req.body;
            
            const dbResult = await linkedModel.linkTheClass({fk_class_id, fk_teacher_id})
            
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                throw new Error("Linking not completed")
            }
            res.send({message: "Linking completed"})
        }
        catch(err){
            res.send({message: err.message})
        }
    }
}  
export default linkedController
import {Request, Response} from 'express'
import registration from '../types/linked'
import linkedModel from '../model/linkedModel'
import {validate} from 'uuid'

const linkedController = {
    studentTheClass: async (req: Request, res: Response):Promise<any> => {
        try{
            const {fk_student_id, fk_class_id } = req.body 
            if (!validate(fk_student_id)) {
                throw new Error("Invalid Student_id");
            }
            if (!validate(fk_class_id)) {
                throw new Error("Invalid Class_id");
            }
            const dbResult = await linkedModel.linkTheClass({fk_class_id, fk_student_id})
            console.log(dbResult);
            
            if(dbResult !== 1){
                res.statusCode = 400;
                if (dbResult.includes(" Cannot add or update a child row: a foreign key constraint fails")){
                    res.statusCode = 404;
                    throw new Error ("Class_id or Student_id unregistered.")
                }
                throw new Error("It was not possible to complete the registration.")
            }
            res.send({message: "Registration completed"})
        }
        catch(err){
            res.send({message: err.message})
        }
    },
    teacherTheClass: async (req: Request, res: Response):Promise<any> => {
        try{
            const {fk_class_id, fk_teacher_id } = req.body;
            if (!validate(fk_class_id)) {
                throw new Error("Invalid Class_id");
            }
            if (!validate(fk_teacher_id)) {
                throw new Error("Invalid Teacher_id");
            }
            
            const dbResult = await linkedModel.linkTheClass({fk_class_id, fk_teacher_id})
            
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                if (dbResult.includes(" Cannot add or update a child row: a foreign key constraint fails")){
                    res.statusCode = 404;
                    throw new Error ("Class_id or Teacher_id unregistered.")
                }
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
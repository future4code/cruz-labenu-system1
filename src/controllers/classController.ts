import {Request, Response} from 'express'
import classTypes from '../types/class'
import classModel from '../model/classModel'
import {v4 as uuidv4} from 'uuid'
const classController = {
    create: async (req: Request, res: Response):Promise<any> => {
        try{
            const {name, start_date, end_date, current_module}:classTypes = req.body;
            const id = uuidv4();
            const dbResult = await classModel.create({id, name, start_date, end_date, current_module})
            
            if(dbResult !== 1){
                 console.log(dbResult)
                res.statusCode = 400;
                throw new Error("class not created")
            }
            res.send({message: "New class created"})
        }
        catch(err){
            res.send({message: err.message})
        }
    }
} 
export default classController
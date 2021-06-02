import { Request, Response } from "express";
import classTypes from "../types/class";
import classModel from "../model/classModel";
import { v4 as uuidv4, validate } from "uuid";
import { current_module as module_enum } from "../types/class";

const classController = {
  create: async (req: Request, res: Response): Promise<any> => {
    try {
      let { name, start_date, end_date, current_module }: classTypes = req.body;
      name = name.trim();
      if (!name) {
        throw new Error("the name needs to be informed.");
      }
      if (!start_date) {
        throw new Error("the start date needs to be informed.");
      }
      const dateS = new Date(start_date).getTime();
      if (isNaN(dateS)) {
        throw new Error("Date isn't in a valid format");
      }
      if (!end_date) {
        throw new Error("the end date needs to be informed.");
      }
      const date = new Date(end_date).getTime();
      if (isNaN(date)) {
        throw new Error("Date isn't in a valid format");
      }
      const id = uuidv4();
      const dbResult = await classModel.create({
        id,
        name,
        start_date,
        end_date,
        current_module,
      });

      if (dbResult !== 1) {
        console.log(dbResult);
        res.statusCode = 400;
        throw new Error("class not created");
      }
      
      res.send({ message: "New class created" });

    } catch (err) {
      res.send({ message: err.message });
    }
  },
  getAllStudents: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      if (!validate(id)) {
        res.statusCode = 400;
        throw new Error("Invalid Class_id");
      }
      const dbResult = await classModel.getStudents(id);
      if(dbResult.length === 0){
        res.statusCode = 400;
        throw new Error("Class not found");
      }
      
      res.send({ students: dbResult });
    } catch (err) {
      res.send({ message: err.message });
    }
  },
  getAllTeachers: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      if (!validate(id)) {
        res.statusCode = 400;
        throw new Error("Invalid Class_id");
      }
      const dbResult = await classModel.getTeachers(id);
      if(dbResult.length === 0){
        throw new Error("Class not found");
      }
      
      res.send({ teachers: dbResult });
    } catch (err) {
      res.send({ message: err.message });
    }
  },
  updateModule:async (req: Request, res: Response): Promise<any> => {
    try {
      const module= req.body.module as string;
      const id = req.params.id as string;

      if (!validate(id)) {
        res.statusCode = 400;
        throw new Error("Invalid Class_id");
      }
      const dbResult = await classModel.updateModule(id, module);

      if(dbResult === 0){
        res.statusCode = 400;
        throw new Error("Class not update");
      }
      
      res.send({ message: "Class update" });
      
    } catch (err) {
      res.send({ message: err.message });
    }
  }
};
export default classController;

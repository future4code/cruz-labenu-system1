import { Request, Response } from "express";
import classTypes from "../types/class";
import classModel from "../model/classModel";
import { v4 as uuidv4 } from "uuid";
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

      // validar current_module com ENUM

      /* const convert: number  = Number(current_module) || 0
      let currentModuleIsMath = false;
      for (const key in module_enum) {
          if (key === convert ) {
            console.log("passou")
          }
          console.log(key);
      }
 */
     /*  if (!currentModuleIsMath) {
        throw new Error("the current module needs to be informed.");
      } */
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
};
export default classController;

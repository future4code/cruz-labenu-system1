import { Request, Response } from "express";
import student from "../types/student";
import studentModel from "../model/studentModel";
import { v4 as uuidv4, validate} from "uuid";

const StudentController = {
  create: async (req: Request, res: Response): Promise<any> => {
    try {
      let { name, birth_date, email }: student = req.body;

      name = name.trim();
      if (!name) {
        res.statusCode = 400;
        throw new Error("the name needs to be informed.");
      }
      if (!birth_date) {
        res.statusCode = 400;
        throw new Error("the birth date needs to be informed.");
      }
      const date = new Date(birth_date).getTime();
      if (isNaN(date)) {
        res.statusCode = 400;
        throw new Error("Date isn't in a valid format");
      }
      email = email.trim();
      if (!email) {
        res.statusCode = 400;
        throw new Error("the email needs to be informed.");
      }

      const id = uuidv4();
      const dbResult = await studentModel.create({
        id,
        name,
        birth_date,
        email,
      });

      if (dbResult !== 1) {
        console.log(dbResult);
        res.statusCode = 400;
        throw new Error("Student not created");
      }
      res.send({ message: "New student created" });
    } catch (err) {
      res.send({ message: err.message });
    }
  },
  getAgeById: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      
      if (!validate(id)) {
        res.statusCode = 400;
        throw new Error("Invalid Student_id");
      }
      const dbResult = await studentModel.getAgeByID(id);
      if (!dbResult.length) {
        res.statusCode = 400;
        throw new Error("Student not found");
      }
      res.send(dbResult[0]);
    } catch (err) {
      res.send({ message: err.message });
    }
  },
  getByHobby: async (req: Request, res: Response): Promise<any> => {
    try {
      const { hobby_id } = req.params;
      
      if (!validate(hobby_id)) {
        res.statusCode = 400;
        throw new Error("Invalid Hobby_id");
      }
      const dbResult = await studentModel.getByHobby(hobby_id);
      if (!dbResult.length) {
        res.statusCode = 400;
        throw new Error("No students found with this hobby");
      }
      res.send({students:dbResult});
    } catch (err) {
      res.send({ message: err.message });
    }
  },
  del: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      
      if (!validate(id)) {
        res.statusCode = 400;
        throw new Error("Invalid Student_id");
      }
    
      const dbResult = await studentModel.del(id);
      if (dbResult !== 1) {
        res.statusCode = 400;
        throw new Error("Student not delete");
      }
      res.send({message: "Student delete"});

    } catch (err) {
      res.send({ message: err.message });
    }
  }
};
export default StudentController;
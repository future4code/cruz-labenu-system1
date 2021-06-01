import express from 'express';
import Controller from '../controllers/Controller'
const Router = express.Router();

Router.get('/student/age/:id', Controller.student.getAgeById)
Router.put('/student', Controller.student.create)
Router.put('/teacher', Controller.teacher.create)
Router.put('/class', Controller.class.create)
Router.put('/linked/student', Controller.linked.studentTheClass)
Router.put('/linked/teacher', Controller.linked.teacherTheClass)

export default Router
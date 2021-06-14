import express from 'express';
import Controller from '../controllers/Controller'
const Router = express.Router();

Router.get('/student/age/:id', Controller.student.getAgeById)
Router.get('/class/:id/students', Controller.class.getAllStudents)
Router.get('/class/:id/teachers', Controller.class.getAllTeachers)
Router.get('/student/hobby/:hobby_id', Controller.student.getByHobby)
Router.put('/student', Controller.student.create)
Router.put('/teacher', Controller.teacher.create)
Router.put('/class', Controller.class.create)
Router.put('/linked/student', Controller.linked.studentTheClass)
Router.put('/linked/teacher', Controller.linked.teacherTheClass)
Router.put('/class/:id/update', Controller.class.updateModule)
Router.delete('/linked/class/:fk_class_id/student/:fk_student_id', Controller.linked.delStudentTheClass)
Router.delete('/linked/class/:fk_class_id/teacher/:fk_student_id', Controller.linked.delTeacherTheClass)
Router.delete('/student/:id', Controller.student.del)

export default Router
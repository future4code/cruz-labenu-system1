import studentController from './studentController'
import teacherController from './teacherController'
import classController from './classController'
import linkedController from './linkedController'


const Controller = {
    student: studentController,
    teacher: teacherController,
    class: classController,
    linked: linkedController
}

export default Controller
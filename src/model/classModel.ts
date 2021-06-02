import {connection} from '../connection'
import classType from '../types/class'
const classModel = {
    create: async ({id, name, start_date, end_date, current_module}:classType):Promise<any> => {
        try{
            const result =  await connection.raw(`
                INSERT INTO class
                value('${id}', '${name}', '${start_date}', '${end_date}', '${current_module || 0}')
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    getStudents: async (id:string):Promise<any> => {
        try{
            const result =  await connection.raw(`
            SELECT s.id, s.name, s.email, s.birth_date FROM student as s
            JOIN student_class as sc ON  sc.fk_student_id = s.id
            JOIN class as c ON  c.id = sc.fk_class_id
            WHERE c.id = '${id}';
            `)
            return result[0];
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    getTeachers: async (id:string):Promise<any> => {
        try{
            const result =  await connection.raw(`
            SELECT t.id, t.name, t.email, t.birth_date FROM teacher as t
            JOIN teacher_class as tc ON  tc.fk_teacher_id = t.id
            JOIN class as c ON  c.id = tc.fk_class_id
            WHERE c.id = '${id}';
            `)
            return result[0];
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    updateModule: async (id:string, module:string):Promise<any> => {
        try{
            const result =  await connection.raw(`
                 UPDATE class SET current_module = '${module}' WHERE (id = '${id}');
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    }
}

export default classModel;
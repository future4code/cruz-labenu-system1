import {connection} from '../connection'
import student from '../types/student'
const studentsModel = {
    create: async ({id, name, email, birth_date}:student):Promise<any> => {
        try{
            const result =  await connection.raw(`
                INSERT INTO student
                value('${id}', '${name}', '${email}', '${birth_date}')
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    getAgeByID: async (id:string):Promise<any> => {
        try{
            const result =  await connection.raw(`
            SELECT 
                TIMESTAMPDIFF(YEAR, birth_date, current_date()) as age 
            FROM
            student
            where id = '${id}'
            `)
            return result[0]
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    getByHobby: async (hobby_id:string):Promise<any> => {
        try{
            const result =  await connection.raw(`
            SELECT s.id, s.name, h.name as hobby FROM hobbies as h
            JOIN student_hobbies as sh ON sh.fk_hobbies_id = h.id
            JOIN student as s ON s.id = sh.fk_student_id
            WHERE h.id = '${hobby_id}'
            `)
            return result[0]
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    },
    del: async (id:string):Promise<any> => {
        try{
            await connection.raw(`
                DELETE FROM student_class WHERE fk_student_id = '${id}';
            `)
            await connection.raw(`
                DELETE FROM student_hobbies WHERE fk_student_id = '${id}';
            `)
            const result = await connection.raw(`
                DELETE FROM student WHERE id = '${id}';
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    }
}
export default studentsModel;
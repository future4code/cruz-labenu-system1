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
    }
}
export default studentsModel;
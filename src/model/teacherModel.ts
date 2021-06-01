import {connection} from '../connection'
import teacher from '../types/teacher'
const teacherModel = {
    create: async ({id, name, email, birth_date}:teacher):Promise<any> => {
        try{
            const result =  await connection.raw(`
                INSERT INTO teacher
                value('${id}', '${name}', '${email}', '${birth_date}')
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.menssage || err.sqlMessage)
        }
    }
}
export default teacherModel;
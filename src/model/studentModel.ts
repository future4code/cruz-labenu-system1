import {connection} from '../connection'
import student from '../types/student'
const studentsModel = {
    create: async ({id, name, email, birth_date}:student):Promise<any> => {
        try{
            const result =  await connection.raw(`
                INSERT INTO student
                value('${id}', '${name}', '${email}', '${birth_date}')
            `)
            console.log(result.menssage[0].affectedRows)
            return result.menssage[0].affectedRows;
        }
        catch(err){
            return (err.menssage || err.sqlMessage)
        }
    }
}
export default studentsModel;
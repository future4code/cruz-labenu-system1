import {connection} from '../connection'
import registration from '../types/linked'
const linkedModel = {
    linkTheClass: async ({fk_student_id, fk_teacher_id, fk_class_id}:registration):Promise<any> => {
        try{
            const table = fk_student_id ?"student_class": "teacher_class";
            const user = fk_student_id || fk_teacher_id;
            const result =  await connection.raw(`
                INSERT INTO ${table}
                value('${user}', '${fk_class_id}')
            `)
            return result[0].affectedRows;
        }
        catch(err){
            return (err.message || err.sqlMessage)
        }
    }
}
export default linkedModel;
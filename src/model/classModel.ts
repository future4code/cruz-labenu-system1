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
            return (err.menssage || err.sqlMessage)
        }
    }
}

export default classModel;
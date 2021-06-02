export enum current_module{
    M0 = '0',
    M1 = '1',
    M2 ='2',
    M3 ='3', 
    M4 ='4', 
    M5 ='5', 
    M6 ='6', 
    M7 ='7'    
}
type classType = {
    id: string, 
    name: string,
    start_date: Date,
    end_date: Date, 
    current_module: current_module|undefined
}
export default classType;
export enum current_module{
    M0,
    M1,
    M2, 
    M3,
    M4, 
    M5, 
    M6, 
    M7
}

type classType = {
    id: string, 
    name: string,
    start_date: Date,
    end_date: Date, 
    current_module: current_module|undefined
}
export default classType;
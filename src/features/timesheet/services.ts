import Client from "../../api"

export const getTimeSheet=async(data:any)=>{
    try{
        const response = await new Client().hr.timesheet.submitTimesheet(data);
        return response
    } catch (error){
        console.log("Error in get timesheet")
    }
}

export const getemployeeTimeSheet=async(data:any,timesheetid:any)=>{
    try{
        const response = await new Client().hr.timesheet.employeeTimesheet(timesheetid,data);
        return response
    } catch (error){
        console.log("Error in get employeetimesheet")
    }
}
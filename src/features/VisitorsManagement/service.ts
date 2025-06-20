import Client from "../../api";

export const getVisitors=async(data:any)=>{
    try{
        const response = await new Client().hr.visitors.getAllVisitors(data);
        // console.log("Visitors response:", response);
        return response
    } catch (error){
        console.log("Error in get timesheet")
    }
}
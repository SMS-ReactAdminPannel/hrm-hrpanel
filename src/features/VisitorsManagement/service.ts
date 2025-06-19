import Client from "../../api";

export const getVisitors=async(data:any)=>{
    try{
        const response = await new Client().hr.visitors.getAllVisitors();
        // console.log("Visitors response:", response);
        return response
    } catch (error){
        console.log("Error in get timesheet")
    }
}

export const createVisitor=async(data:any)=>{
    try{
        const response = await new Client().hr.visitors.createVisitor(data);
        // console.log("Visitors response:", response);
        return response
    } catch (error){
        console.log("Error in get timesheet")
    }
}

export const deleteVisitor=async(id:string)=>{
    try{
        const response = await new Client().hr.visitors.deleteVisitor(id);
        // console.log("Visitors response:", response);
        return response
    } catch (error){
        console.log("Error in get timesheet")
    }
}
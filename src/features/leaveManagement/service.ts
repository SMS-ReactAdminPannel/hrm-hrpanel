import Client from "../../api";

export const createHoliday = async (data: any) => {
    try{
        const response = await new Client().hr.leave.createHoliday(data);
        console.log("Create Holiday response:", response);
        return response;
    } catch (error) {
        console.error("Error in createHoliday:", error);
        throw error; 
    }
}

export const getAllHoliday = async () => {
    try{
        const response = await new Client().hr.leave.getAllHoliday();
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error in getAllHoliday:", error);
        throw error; 
    }
}

export const updateHoliday = async (data: any, id: any) => {
    try{
        const response = await new Client().hr.leave.updateHoliday(data, id);
        console.log("Update Holiday response:", response);
        return response;
    } catch (error) {
        console.error("Error in updateHoliday:", error);
        throw error; 
    }
}       

export const deleteHoliday = async (id: any) => {
    try{
        const response = await new Client().hr.leave.deleteHoliday(id);
        console.log("Delete Holiday response:", response);
        return response;
    } catch (error) {
        console.error("Error in deleteHoliday:", error);
        throw error; 
    }
}

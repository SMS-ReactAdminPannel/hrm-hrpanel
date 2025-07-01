
import Client from "../../api"

//getall leavetype
export const leavetypeapi = async () => {
  try {
    const response = await new Client().hr.leavetype.getall({});
    console.log("what is happening",response)
    return response;
  } catch (error) {
    console.log("backend data not getting", error);
  }
};



export const leavetypeedit = async (leaveTypeId: string, data: any) => {
  try {
    const response = await new Client().hr.leavetype.update(leaveTypeId, data);
    return response;
  } catch (error) {
    console.error("Error while editing leave type:", error);
    throw error; 
  }
};

// export const leavetypeedit = async (leaveTypeId: string, data: any) => {
//   try {
    
//     const response = await new client().hr.leavetype.update(leaveTypeId, data);
//     return response;
//   } catch (error) {
//     console.error("Error while editing leave type:", error);
//     throw error;
//   }
// };



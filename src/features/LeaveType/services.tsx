
import Client from "../../api"


export const leavetypeapi = async () => {
  try {
    const response = await new Client().hr.leavetype.getall({});
    console.log("what is happening",response)
    return response;
  } catch (error) {
    console.log("Error in getAllGrievances", error);
  }
};
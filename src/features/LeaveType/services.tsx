
import Client from "../../api"

//getall leavetype
export const leavetypeapi = async () => {
  try {
    const response = await new Client().hr.leavetype.getall({});
    console.log("what is happening",response)
    return response;
  } catch (error) {
    console.log("Error in getAllGrievances", error);
  }
};
//updateleavetype
export const updateleavetypeapi = async (id: string, data: any) => {
  try {
    const response = await new Client().hr.leavetype.update(id, data);
    console.log("update is happening or not",response);
    return response;
  } catch (error) {
    console.log("Error in updateleavetypeapi", error);
  }
};
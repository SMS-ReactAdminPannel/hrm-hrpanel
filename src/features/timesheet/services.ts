
import Client from "../../api";

export const getClockin = async () => {
  try {
    
    const response = await new Client().hr.timesheet.getFilteredTimeEntries({});
    console.log("backend comming",response.data)
    return response;
  } catch (error) {
    console.log("Error in getTimeSheet:", error);
    throw error;
  }
};




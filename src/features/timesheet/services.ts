
import Client from "../../api";

export const getClockin = async () => {
  try {
    
    const response = await new Client().hr.timesheet.submitTimesheet({});
    console.log("backend comming",response)
    return response;
  } catch (error) {
    console.log("Error in getTimeSheet:", error);
    throw error;
  }
};


export const getdailtattendancedata = async () => {
  try {
    
    const response = await new Client().hr.timesheet.getDailyAttendance({});
    console.log("backend comming for getdailyattendence",response)
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};




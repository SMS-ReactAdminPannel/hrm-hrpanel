// features/timesheet/services.ts
import Client from "../../api";

export const getTimeSheet = async (data: any) => {
  try {
    
    const response = await Client.hr.timesheet.submitTimesheet(data);
    return response?.data?.data;
  } catch (error) {
    console.error("Error in getTimeSheet:", error);
    throw error;
  }
};

 export const getemployeeTimeSheet = async (
  timesheetId: string,
  data: any
): Promise<any[]> => {
  try {
    const result = await Client.hr.timesheet.employeeTimesheet(timesheetId, data);
    // console.log("getemployeeTimeSheet result PRINTOUT:", result);
    // if (!Array.isArray(result)) {
    //   console.error(" Expected an array but got:", result);
    //   return [];
    // }
    


    return result;
  } catch (error) {
    console.error("Error in getemployeeTimeSheet:", error);
    throw error;
  }
};


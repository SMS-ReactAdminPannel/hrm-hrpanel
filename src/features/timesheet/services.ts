


// import axios from "axios";


// export const getClockin = async () => {
//   try {
    
//     const response = await new Client().hr.timesheet.getFilteredTimeEntries({});
//     console.log("filtered comming",response)
//     return response;
//   } catch (error) {
//     console.log("Error in getTimeSheet:", error);
//     throw error;
//   }
// };


// Assuming httpClient and API_END_POINTS are already set up properly in your project
import Client from "../../api"; 

export const getClockin = async (filters: { employeeId: string; startDate: string; endDate: string }) => {
  try {
    const data = {
      employee_id: filters.employeeId, // if API expects snake_case
      startDate: filters.startDate,
      endDate: filters.endDate,
    };

    const response = await new Client().hr.timesheet.getFilteredTimeEntries(data);
    return response.data;
  } catch (error) {
    console.error('Error in getClockin:', error);
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




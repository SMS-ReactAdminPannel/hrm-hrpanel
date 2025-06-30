import Client from "../../api";
const apiClient = new Client();

export const getEmployeeDetailsById = async (employeeDetailId: string) => {
  try {
    const response = await new Client().employee.employeedetails.getById(employeeDetailId);
    // console.log(" RAW FULL RESPONSE =>", response);
    return response; 
  } catch (error) {
    console.error(" Failed to fetch employee details:", error);
    throw error;
  }
};


export const updateEmployeeDetails = async (employeeDetailId: string, data: any) => {
  try {
    const response = await apiClient.employee.employeedetails.update(employeeDetailId, data);
    return response?.data;
  } catch (error) {
    console.error("Failed to update employee details:", error);
    throw error;
  }
};

import Client from "../../api";
const apiClient = new Client();

export const getAllEmployeeUsers = async () => {
  return await apiClient.employee.employeeuser.getAllProfile();
};

export const createEmployeeUser = async (data: any) => {
  return await apiClient.employee.employeeuser.createProfile(data);
};

export const deleteEmployeeUser = async (id: string) => {
  return await apiClient.employee.employeeuser.deleteProfile(id);
};

export const updateEmployeeUserByUUID = async (id: string, data: any) => {
  return await apiClient.employee.employeeuser.updateProfileWithUUID(id, data);
};

export const getEmployeeUserProfile = async () => {
  return await apiClient.employee.employeeuser.getProfile();
};

export const loginEmployeeUser = async (data: any) => {
  return await apiClient.employee.employeeuser.login(data);
};

export const signUpEmployeeUser = async (data: any) => {
  return await apiClient.employee.employeeuser.signUp(data);
};

export const logoutEmployeeUser = async () => {
  return await apiClient.employee.employeeuser.logout();
};

// src/services/departmentService.ts
import Client from "../../api";


// ✅ Create a single Client instance


export const getAllDepartments = async () => {
  try {
    const response = await new Client().hr.departments.getAllDepartments();
    return response.data;
  } catch (error) {
    console.error("Error in getAllDepartments:", error);
    throw error;
  }
};


// If needed later, uncomment and use like this:
// export const getDepartmentById = async (id: string) => {
//   try {
//     const response = await Client.hr.department.getDepartmentById(id);
//     return response;
//   } catch (error) {
//     console.error("Error in getDepartmentById:", error);
//     throw error;
//   }
// };

export const createDepartment = async (data: {
  name: string;
  description: string;
  requiredRoles: string[];
}) => {
  try {
    const response = await new Client().hr.departments.createDepartment(data);
    return response;
  } catch (error) {
    console.error("Error in createDepartment:", error);
    throw error;
  }
};

export const updateDepartment = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    requiredRoles?: string[];
  }
) => {
  try {
    const response = await new Client().hr.departments.updateDepartment(id, data);
    return response;
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    throw error;
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    const response = await new Client().hr.departments.deleteDepartment(id);
    return response;
  } catch (error) {
    console.error("Error in deleteDepartment:", error);
    throw error;
  }
};
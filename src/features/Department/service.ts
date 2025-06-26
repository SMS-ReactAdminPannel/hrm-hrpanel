// src/services/departmentService.ts
import client from "../../api"; 

export const getAllDepartments = async () => {
  try {
    const response = await client.hr.departments.getAllDepartments();
    return response;
  } catch (error) {
    console.error("Error in getAllDepartments:", error);
    throw error;
  }
};

export const getDepartmentById = async (id: string) => {
  try {
    const response = await client.hr.departments.getDepartmentById(id);
    return response;
  } catch (error) {
    console.error("Error in getDepartmentById:", error);
    throw error;
  }
};

export const createDepartment = async (data: {
  name: string;
  description: string;
  requiredRoles: string[];
}) => {
  try {
    const response = await client.hr.departments.createDepartment(data);
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
    const response = await client.hr.departments.updateDepartment(id, data);
    return response;
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    throw error;
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    const response = await client.hr.departments.deleteDepartment(id);
    return response;
  } catch (error) {
    console.error("Error in deleteDepartment:", error);
    throw error;
  }
};

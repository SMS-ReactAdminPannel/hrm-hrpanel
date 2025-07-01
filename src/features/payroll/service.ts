import Client from "../../api";
export const createPayroll = async (data: any) => {
  try {
    const response = await new Client().hr.payroll.createPayroll(data);
    return response.data;
  } catch (error) {
    console.error("Error creating payroll:", error);
    throw error;
  }
};

export const getAllPayrolls = async () => {
  try {
    const response = await new Client().hr.payroll.getAllPayrolls();
    return response;
  } catch (error) {
    console.error("Error fetching payrolls:", error);
    throw error;
  }
};

export const getPayrollById = async (id: string) => {
  try {
    const response = await new Client().hr.payroll.getPayrollById(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching payroll by ID:", error);
    throw error;
  }
};

export const updatePayroll = async (id: string, data: any) => {
  try {
    const response = await new Client().hr.payroll.updatePayroll(id, data);
    return response.data;
  } catch (error) {
    console.error("Error updating payroll:", error);
    throw error;
  }
};

export const deletePayroll = async (id: string) => {
  try {
    const response = await new Client().hr.payroll.deletePayroll(id);
    return response.data;
  } catch (error) {
    console.error("Error deleting payroll:", error);
    throw error;
  }
};

import Client from "../../api";

export const getAllLeaveTypes = async () => {
  try {
    const response = await new Client().hr.leaveType.getAllLeaveType();
    return response.data;
  } catch (error) {
    console.error("Error fetching leave types:", error);
    throw error;
  }
}
export const getLeaveTypeById = async (id: string) => {
  try {
    const response = await new Client().hr.leaveType.getLeaveTypeById(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave type by ID:", error);
    throw error;
  }
}

export const updateLeaveType = async (id: string, data: any) => {
  try {
    const response = await new Client().hr.leaveType.updateLeaveType(data, id);
    return response.data;
  } catch (error) {
    console.error("Error updating leave type:", error);
    throw error;
  }
}

export const createLeaveType = async (data: any) => {
  try {
    const response = await new Client().hr.leaveType.createLeaveType(data);
    return response.data;
  } catch (error) {
    console.error("Error creating leave type:", error);
    throw error;
  }
}

export const deleteLeaveType = async (id: string) => {
  try {
    const response = await new Client().hr.leaveType.deleteLeaveType(id);
    return response.data;
  } catch (error) {
    console.error("Error deleting leave type:", error);
    throw error;
  }
}
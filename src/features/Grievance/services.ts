import Client from "../../api";

// Get all grievances
export const getAllGrievances = async () => {
  try {
    const response = await new Client().hr.grievance.getAllGrievances();
    return response;
  } catch (error) {
    console.log("Error in getAllGrievances", error);
  }
};

// Create a new grievance
export const createGrievance = async (data: any) => {
  try {
    const response = await new Client().hr.grievance.createGrievance(data);
    return response;
  } catch (error) {
    console.log("Error in createGrievance", error);
  }
};

// Update grievance status
export const updateGrievanceStatus = async (grievanceId: string, data: { status: "solved" | "unsolved" }) => {
  try {
    const response = await new Client().hr.grievance.updateGrievanceStatus(grievanceId, data);
    return response;
  } catch (error) {
    console.error("Error in updateGrievanceStatus", error);
    throw error;
  }

};

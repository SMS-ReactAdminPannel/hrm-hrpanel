import Client from "../../api";


export const getAllGrievances = async () => {
  try {
    const response = await new Client().hr.grievance.getAllGrievances();
    return response;
  } catch (error) {
    console.log("Error in getAllGrievances", error);
  }
};


export const createGrievance = async (data) => {
  try {
    const response = await new Client().hr.grievance.createGrievance(data);
    return response;
  } catch (error) {
    console.log("Error in createGrievance", error);
  }
};


export const updateGrievanceStatus = async (grievanceId: string, data: { status: "solved" | "unsolved" }) => {
  try {
    const response = await new Client().hr.grievance.updateGrievanceStatus(grievanceId, data);
    return response;
  } catch (error) {
    console.error("Error in updateGrievanceStatus", error);
    throw error;
  }

};

import Client from "../../api";


export const getAllcandidates = async () => {
  try {
    const response = await new Client().hr.candidates.getAllcandidates();
    return response;
  } catch (error) {
    console.log("Error in getAllcandidates", error);
  }
}


export const createcandidates = async (data: any) => {
  try {
    const response = await new Client().hr.candidates.createcandidates(data);
    return response;
  } catch (error) {
    console.log("Error in createcandidates", error);
  }
};


export const updateStatus = async (candidatesId: string, data: { status: "interview schedules"|"under review"|"shortlisted"}) => {
  try {
    const response = await new Client().hr.candidates.updateStatus(candidatesId, data);
    return response;
  } catch (error) {
    console.error("Error in updateStatus", error);
    throw error;
  }

};

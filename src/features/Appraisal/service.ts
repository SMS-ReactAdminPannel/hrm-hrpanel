import Client from "../../api";
//appraisal
// ✅ Create Appraisal
export const createAppraisal = async (data: any) => {
  try {
    const response = await new Client().hr.appraisal.create(data);
    return response;
  } catch (error) {
    console.error("Error in createAppraisal:", error);
  }
};
// ✅ Get All Appraisals (with optional params: pagination, filters, etc.)
export const getAllAppraisals = async () => {
  try {
    const response = await new Client().hr.appraisal.getAll();
    console.log('get ',response)
    return response;
  } catch (error) {
    console.error("Error in getAllAppraisals:", error);
  }
};

// ✅ Get Appraisal By ID
export const getAppraisalById = async (appraisalId: string) => {
  try {
    const response = await new Client().hr.appraisal.getById(appraisalId);
    return response;
  } catch (error) {
    console.error("Error in getAppraisalById:", error);
  }
};

// ✅ Update Appraisal By ID
export const updateAppraisal = async (appraisalId: string, data: any) => {
  try {
    const response = await new Client().hr.appraisal.update(appraisalId, data);
    return response;
  } catch (error) {
    console.error("Error in updateAppraisal:", error);
  }
};

// ✅ Delete Appraisal By ID
export const deleteAppraisal = async (appraisalId: string) => {
  try {
    const response = await new Client().hr.appraisal.delete(appraisalId);
    return response;
  } catch (error) {
    console.error("Error in deleteAppraisal:", error);
  }
};
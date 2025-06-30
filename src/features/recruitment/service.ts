import Client from "../../api";
export const createJobPosting = async (data: any) => {
  try {
    const response = await new Client().hr.jobposting.createJobPosting(data);
    return response.data;
  } catch (error) {
    console.error("Error creating job posting:", error);
    throw error;
  }
}
export const getAllJobPostings = async () => {
  try {
    const response = await new Client().hr.jobposting.getAllJobPostings();
    return response;
    console.log("Job postings fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching job postings:", error);
    throw error;
  }
}

export const updateJobPosting = async (id: string, data: any) => {
  try {
    const response = await new Client().hr.jobposting.updateJobPosting(id, data);
    return response.data;
  } catch (error) {
    console.error("Error updating job posting:", error);
    throw error;
  }
}
export const deleteJobPosting = async (id: string) => {
  try {
    const response = await new Client().hr.jobposting.deleteJobPosting(id);
    return response.data;
  } catch (error) {
    console.error("Error deleting job posting:", error);
    throw error;
  }
}

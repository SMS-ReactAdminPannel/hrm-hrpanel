//announcement
import Client from "../../api";



export const AnnouncementGetAll = async () => {
  try {
    const response = await new Client().hr.announcement.AnnouncementGetAll();
    console.log("data in api getting area",response)
    return response;
  } catch (error) {
    console.error("Error in createAppraisal:", error);
  }
};
//announcement
import Client from "../../api";



export const AnnouncementGetAll = async () => {
  try {
    const response = await new Client().hr.announcement.AnnouncementGetAll();
    return response;
  } catch (error) {
    console.error("Error in createAppraisal:", error);
  }
};
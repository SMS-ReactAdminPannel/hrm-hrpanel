//announcement
import Client from "../../api";



export const AnnouncementGetAll = async (data: any) => {
  try {
    const response = await new Client().hr.announcement.AnnouncementGetAll(data);
    return response;
  } catch (error) {
    console.error("Error in createAppraisal:", error);
  }
};
import Client from "../../api";

export const getDailyAttendance = async (data:{date:string}) => {
  try {
    const response = await new Client().hr.attendance.getDailyAttendance(data);
    console.log("Attendance response:", response);
    return response;
  } catch (error) {
    console.log("Error in getting daily attendance", error);
    return [];
  }
};


import httpClient from "./httpClient";
import { API_END_POINTS } from "./httpEndpoints";

export default class Client {
  hr = {
    timesheet: {
      clockIn: (data: any) =>
        httpClient.post(API_END_POINTS.timesheet.postclockin, data),

      clockOut: (data: any) =>
        httpClient.post(API_END_POINTS.timesheet.postclockout, data),

      submitTimesheet: (data: any) =>
        httpClient.get(API_END_POINTS.timesheet.getsubmittimesheet, data),

      approveTimesheet: (timesheetId: string, data: any) =>
        httpClient.update(
          API_END_POINTS.timesheet.patchapprovetimesheet(timesheetId),
          data
        ),

      employeeTimesheet: (timesheetId: string, data: any) =>
        httpClient.get(API_END_POINTS.timesheet.getemployeetimesheet(timesheetId), data),
    },

   

    hrprofile:{
       postlogin:(data:any)=>httpClient.post(API_END_POINTS.hrprofile.Postlogin,data),
       postregister:(data:any)=>httpClient.post(API_END_POINTS.hrprofile.Postregister,data)
    },

    candidates:{
       createcandidates: (data: any) =>
    httpClient.post(API_END_POINTS.candidates.createcandidates, data),

  getAllcandidates: () =>
    httpClient.get(API_END_POINTS.candidates.getallcandidates),

  updateStatus: (candidatesId: string, data: any) =>
  httpClient.update(API_END_POINTS.candidates.patchstatus(candidatesId), data)

    },
    grievance: {
      createGrievance: (data: any) =>
        httpClient.post(API_END_POINTS.grievance.creategrievance, data),

      updateGrievanceStatus: (grievanceId: string, data: any) =>
        httpClient.update(API_END_POINTS.grievance.patchgrievance(grievanceId), data)

    },
    announcement:{
      AnnouncementGetAll:(data:any) =>
        httpClient.get(API_END_POINTS.announcement.AnnouncementGetAll,data),
    },
    getAllGrievances: () =>
        httpClient.get(API_END_POINTS.grievance.getallgrievance),

      updateGrievanceStatus: (grievanceId: string, data: any) =>
        httpClient.update(API_END_POINTS.grievance.patchgrievance(grievanceId), data),
    }

  };


      
 

// export default new Client();

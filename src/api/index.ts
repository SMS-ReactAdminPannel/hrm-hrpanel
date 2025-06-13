import httpClient from "./httpClient";
import { API_END_POINTS } from "./httpEndpoints";

class Client {
  hr = {
    timesheet: {
      clockIn: (data: any) => httpClient.post(API_END_POINTS.timesheet.postclockin, data),

      clockOut: (data: any) => httpClient.post(API_END_POINTS.timesheet.postclockout, data),

      submitTimesheet: (data: any) =>
        httpClient.get(API_END_POINTS.timesheet.getsubmittimesheet, data),

      approveTimesheet: (timesheetId: string, data: any) =>
        httpClient.update(API_END_POINTS.timesheet.patchapprovetimesheet(timesheetId), data),

      employeeTimesheet: (timesheetId: string, data: any) =>
        httpClient.get(API_END_POINTS.timesheet.getemployeetimesheet(timesheetId), data),
    },
    
    grievance:{
       createGrievance: (data: any) =>
    httpClient.post(API_END_POINTS.grievance.creategrievance, data),

  getAllGrievances: () =>
    httpClient.get(API_END_POINTS.grievance.getallgrievance),

  updateGrievanceStatus: (grievanceId: string, data: any) =>
    httpClient.update(API_END_POINTS.grievance.patchgrievance(grievanceId), data),
    },
     appraisal: {
      create: (data: any) =>
        httpClient.post(API_END_POINTS.appraisal.create, data),

      getAll: (params?: any) =>
        httpClient.get(API_END_POINTS.appraisal.getAll,  params ),

      getById: (appraisalId: string) =>
        httpClient.get(API_END_POINTS.appraisal.getById(appraisalId)),

      update: (appraisalId: string, data: any) =>
        httpClient.update(API_END_POINTS.appraisal.update(appraisalId), data),

      delete: (appraisalId: string) =>
        httpClient.delete(API_END_POINTS.appraisal.delete(appraisalId)),
    },
  };
}


export default Client;


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
  httpClient.update(API_END_POINTS.grievance.patchgrievance(grievanceId), data)

    },

    hrprofile:{
       postlogin:(data:any)=>httpClient.post(API_END_POINTS.hrprofile.Postlogin,data),
       postregister:(data:any)=>httpClient.post(API_END_POINTS.hrprofile.Postregister,data),
       postlogout: () => httpClient.post(API_END_POINTS.hrprofile.postlogout,{})
    },

    candidates:{
       createcandidates: (data: any) =>
    httpClient.post(API_END_POINTS.candidates.createcandidates, data),

  getAllcandidates: () =>
    httpClient.get(API_END_POINTS.candidates.getallcandidates),

  updateStatus: (candidatesId: string, data: any) =>
  httpClient.update(API_END_POINTS.candidates.patchstatus(candidatesId), data)

    },

    assetcategory:{
      createassetcategory:(data:any)=>
        httpClient.post(API_END_POINTS.assetcategory.createassetcategory,data),

      getassetcategory:(assetId: string,data:any)=>
        httpClient.get(API_END_POINTS.assetcategory.getassetcategory(assetId), data),

      getallassetcategory:()=>
        httpClient.get(API_END_POINTS.assetcategory.getallassetcategory),

      updateassetcategory: (assetId: string, data: any) =>
       httpClient.update(API_END_POINTS.assetcategory.updateassetcategory(assetId), data),

      deleteassetcategory: (assetId: string) =>
      httpClient.delete(API_END_POINTS.assetcategory.deleteassetcategory(assetId))


    },

    asset:{
      assetcreate:(data:any)=>
        httpClient.post(API_END_POINTS.asset.createasset,data),

      assetget:(assetId: string,data:any)=>
        httpClient.get(API_END_POINTS.asset.getasset(assetId), data),

      assetgetall:()=>
        httpClient.get(API_END_POINTS.asset.getallasset),

      assetupdate: (assetId: string, data: any) =>
       httpClient.update(API_END_POINTS.asset.updateasset(assetId), data),

      assetdelete: (assetId: string) =>
      httpClient.delete(API_END_POINTS.asset.deleteasset(assetId))


    }

  };
}

export default Client;

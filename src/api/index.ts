
import httpClient from "./httpClient";
import { API_END_POINTS } from "./httpEndpoints";

export default class Client {
  hr = {
    timesheet: {
      clockIn: (data: any) => httpClient.post(API_END_POINTS.timesheet.postclockin, data),

      clockOut: (data: any) => httpClient.post(API_END_POINTS.timesheet.postclockout, data),

      submitTimesheet: (data: any) =>
        httpClient.get(API_END_POINTS.timesheet.getsubmittimesheet, data),

      approveTimesheet: (timesheetId: string, data: any) =>
        httpClient.patch(API_END_POINTS.timesheet.patchapprovetimesheet(timesheetId), data),

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
  httpClient.patch(API_END_POINTS.candidates.patchstatus(candidatesId), data)

    },
  
    announcement:{
      AnnouncementGetAll:() =>
        httpClient.get(API_END_POINTS.announcement.AnnouncementGetAll),
    },

    attendance: {
      getDailyAttendance: (params:{date:string}) =>
        httpClient.get(API_END_POINTS.attendance.getDailyAttendance,params),
    },

    asset:{
      createasset:(data:any)=>
        httpClient.post(API_END_POINTS.asset.createAsset,data),

      getasset:(assetId: string)=>
        httpClient.get(API_END_POINTS.asset.getAssetById(assetId)),

      getallasset:()=>
        httpClient.get(API_END_POINTS.asset.getAllAsset),

      updateasset: (assetId: string, data: any) =>
       httpClient.update(API_END_POINTS.asset.updateAsset(assetId), data),

      deleteasset: (assetId: string) =>
      httpClient.delete(API_END_POINTS.asset.deleteAsset(assetId))


    },

    departments: {
      getAllDepartments: () =>
        httpClient.get(API_END_POINTS.department.getAll),
    
      createDepartment: (data: any) =>
        httpClient.post(API_END_POINTS.department.create, data),
    
      updateDepartment: (id: string, data: any) =>
        httpClient.put(API_END_POINTS.department.update(id), data),
    
      deleteDepartment: (id: string) =>
        httpClient.delete(API_END_POINTS.department.delete(id)),
    },
    
    assetcategory:{
      createassetcategory:(data:any)=>
        httpClient.post(API_END_POINTS.assetCategory.createCategory,data),

      getassetcategory:(assetId: string)=>
        httpClient.get(API_END_POINTS.assetCategory.getCategoryById(assetId)),

      getallassetcategory:()=>
        httpClient.get(API_END_POINTS.assetCategory.getAllCategory),

      updateassetcategory: (assetId: string, data: any) =>
       httpClient.update(API_END_POINTS.assetCategory.updateCategory(assetId), data),

      deleteassetcategory: (assetId: string) =>
      httpClient.delete(API_END_POINTS.assetCategory.deleteCategory(assetId))

    },

    visitors:{
      createVisitor: (data: any) =>
        httpClient.post(API_END_POINTS.visitors.create, data),
      getAllVisitors: () =>
        httpClient.get(API_END_POINTS.visitors.getAll),
      deleteVisitor: (visitorId: string) =>
        httpClient.delete(API_END_POINTS.visitors.delete.replace(':id', visitorId))
    }

  };
    static hr: any;
}


      
 

// export default new Client();

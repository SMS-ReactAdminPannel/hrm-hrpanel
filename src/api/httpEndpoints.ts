export const API_END_POINTS = {
  timesheet: {
    postclockin: "/api/hr/timesheet/clock-in",
    postclockout: "/timesheet/clock-out",
    getsubmittimesheet: "/api/hr/timesheet/submit",
    patchapprovetimesheet: (id: string) => `/timesheet/approve/${id}`,
    getemployeetimesheet:(id: string) =>`/api/hr/timesheet/${id}`
  },

  grievance:{
    creategrievance:"/api/hr/grievance/create",
    getallgrievance:"/api/hr/grievance/getall",
    patchgrievance:(id:string)=>`/api/hr/grievance/${id}/status`
  },

  hrprofile:{
    Postlogin:"/api/hr/auth/signin",
    Postregister:"/api/hr/auth/",
  },

  candidates:{
    createcandidates:"/api/hr/candidates/create",
    getallcandidates:"/api/hr/candidates/getall",
    patchstatus:(id:string)=>`/api/hr/candidates/${id}/status`
  },
  asset: {
    getAllAssets: "/api/asset/all",
    getAssetById: (id: string) => `/api/asset/${id}`,
    createAsset: "/api/asset/create",
    updateAsset: (id: string) => `/api/asset/update/${id}`,
    deleteAsset: (id: string) => `/api/asset/delete/${id}`,
  },
  department : {
    getAll:  "/api/department/all",
  },
  announcement:{
    AnnouncementCreate:"/api/hr/announcement/create",
    AnnouncementGetOne:"/api/hr/announcement/get/:id",
    AnnouncementGetAll:"/api/hr/announcement/getall",
    AnnouncementUpdateWithUUID:"/api/hr/announcement/update/:id",
    AnnouncementDelete:"/api/hr/announcement/delete/:id"
  }
};



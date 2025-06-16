


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
    postlogout:"/api/hr/auth/logout"
  },

  candidates:{
    createcandidates:"/api/hr/candidates/create",
    getallcandidates:"/api/hr/candidates/getall",
    patchstatus:(id:string)=>`/api/hr/candidates/${id}/status`
  },


  assetcategory:{
    createassetcategory:"/api/hr/assetcategory/create",
    getassetcategory:(id:string)=>`/api/hr/assetcategory/get/${id}`,
    getallassetcategory:"/api/hr/assetcategory/getall",
    updateassetcategory:(id:string)=>`/api/hr/assetcategory/update/${id}`,
    deleteassetcategory:(id:string)=>`/api/hr/assetcategory/delete/${id}`,
  },

  asset:{
    createasset:"/api/hr/assetcategory/assetcreate",
    getasset:(id:string)=>`/api/hr/assetcategory/assetget/${id}`,
    getallasset:"/api/hr/assetcategory/assetgetall",
    updateasset:(id:string)=>`/api/hr/assetcategory/assetupdate/${id}`,
    deleteasset:(id:string)=>`/api/hr/assetcategory/assetdelete/${id}`,


  }
};


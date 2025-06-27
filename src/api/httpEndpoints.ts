


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
    postlogout:"/api/hr/auth/logout",
    validateOtp: "/api/hr/auth/otp",
    forgotPassword: "/api/hr/auth/forgot-password",
    resetPassword: "/api/hr/auth/reset-password"
  },

  candidates:{
    createcandidates:"/api/hr/candidates/create",
    getallcandidates:"/api/hr/candidates/getall",
    patchstatus:(id:string)=>`/api/hr/candidates/${id}/status`
  },

   asset: {
    createAsset: "/api/hr/assetproperty/create-assets",
    getAllAsset: "/api/hr/assetproperty/getall-assets",
    getAssetById: (id: string) => `/api/hr/assetproperty/get-assets/${id}`,
    updateAsset: (id: string) => `/api/hr/assetproperty/update-assets/${id}`,
    deleteAsset: (id: string) => `/api/hr/assetproperty/delete-assets/${id}`,
  },

  assetcategory:{
    createasset:"/api/hr/assetcategory/create",
    getasset:(id:string)=>`/api/hr/assetcategory/get/${id}`,
    getallasset:"/api/hr/assetcategory/getall",
    updateasset:(id:string)=>`/api/hr/assetcategory/update/${id}`,
    deleteasset:(id:string)=>`/api/hr/assetcategory/delete/${id}`,

  },
  // asset: {
  //   getAllAssets: "/api/assets",
  //   getAssetById: (id: string) => `/api/asset/${id}`,
  //   createAsset: "/api/assets",
  //   updateAsset: (id: string) => `/api/assets/${id}`,
  //   deleteAsset: (id: string) => `/api/assets/${id}`,
  // },


    jobPosting: {
      getAll: "/api/job-postings",
      getById: "/api/job-postings",   
      create: "/api/job-postings",
      update: "/api/job-postings",    
      delete: "/api/job-postings",    
    },


      department: {
        getAll: "/api/hr/departments/getall",
        create: "/api/hr/departments/create",
        update: (id: string) => `/api/hr/departments/update/${id}`,
        delete: (id: string) => `/api/hr/departments/delete/${id}`,
},
    visitors:{
    create: "api/hr/visitors/",
      getAll: "api/hr/visitors/getAll",
      delete:"/api/hr/visitors/:id",
    } ,
  
  announcement:{
    AnnouncementCreate:"/api/hr/announcement/create",
    AnnouncementGetOne:"/api/hr/announcement/get/:id",
    AnnouncementGetAll:"/api/hr/announcement/getall",
    AnnouncementUpdateWithUUID:"/api/hr/announcement/update/:id",
    AnnouncementDelete:"/api/hr/announcement/delete/:id"
  },
  assetCategory: {
    createCategory: "/api/hr/assetproperty/asset-categories",
    getAllCategory: "/api/hr/assetproperty/getallasset-categories",
    getCategoryById: (id: string) => `/api/hr/assetproperty/getasset-categories/${id}`,
    updateCategory: (id: string) => `/api/hr/assetproperty/updateasset-categories/${id}`,
    deleteCategory: (id: string) => `/api/hr/assetproperty/deleteasset-categories/${id}`,
  },
  leave: {
    NewHoliday: "/api/hr/leave/createHoliday",
    getHoliday: "api/hr/leave/getAll",
    updateHoliday: (id: string) => `api/hr/leave/updateHoliday/${id}`,
    deleteHoliday: (id: string) => `api/hr/leave/deleteHoliday/${id}`,
  },
    leaveType: {
    createLeaveType: "/api/hr/leaveType/createLeaveType",
    getAllLeaveType: "api/hr/leaveType/getAllLeave",
    updateLeaveType: (id: string) => `api/hr/leaveType/UpdateLeave/${id}`,
    getLeaveById: (id: string) => `api/hr/leaveType/getUniqueLeave/${id}`,
    deleteLeaveType: (id: string) => `api/hr/leaveType/deleteLeave/${id}`,
  },
  
};

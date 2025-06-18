


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

   asset: {
    createAsset: "/api/hr/assetproperty/create-assets",
    getAllAsset: "/api/hr/assetproperty/getall-assets",
    getAssetById: (id: string) => `/api/hr/assetproperty/get-assets/${id}`,
    updateAsset: (id: string) => `/api/hr/assetproperty/update-assets/${id}`,
    deleteAsset: (id: string) => `/api/hr/assetproperty/delete-assets/${id}`,
  },

  assetCategory: {
    createCategory: "/api/hr/assetproperty/asset-categories",
    getAllCategory: "/api/hr/assetproperty/getallasset-categories",
    getCategoryById: (id: string) => `/api/hr/assetproperty/getasset-categories/${id}`,
    updateCategory: (id: string) => `/api/hr/assetproperty/updateasset-categories/${id}`,
    deleteCategory: (id: string) => `/api/hr/assetproperty/deleteasset-categories/${id}`,
  },
};


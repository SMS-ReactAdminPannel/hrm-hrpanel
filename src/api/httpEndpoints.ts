
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
  }
};


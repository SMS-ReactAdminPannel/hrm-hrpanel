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
  };
}

export default Client;

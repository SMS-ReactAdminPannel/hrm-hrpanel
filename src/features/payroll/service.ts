import HttpClient from "../../api/httpClient";
import { API_END_POINTS } from "../../api/httpEndpoints";




export const createPayroll = (data: any) => HttpClient.post(API_END_POINTS.payroll.create, data);

export const getAllPayrolls = () => HttpClient.get(API_END_POINTS.payroll.getAll);

export const getPayrollById = (id: string) => HttpClient.get(API_END_POINTS.payroll.getOne(id));

export const updatePayroll = (id: string, data: any) =>
  HttpClient.put(`${API_END_POINTS.payroll.update}/${id}`, data);

export const deletePayroll = (id: string) =>
  HttpClient.delete(`${API_END_POINTS.payroll.delete}/${id}`);

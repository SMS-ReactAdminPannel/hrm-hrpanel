import type { RootState } from "../../../store";

export const selectDepartments = (state: RootState): string[] => state.departments.data;
export const selectLoading = (state: RootState): boolean => state.departments.loading;

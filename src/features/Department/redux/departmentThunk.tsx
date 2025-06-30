import type { AppDispatch } from "../../../store";
import { getAllDepartments } from "../service";
import { setDepartments, setLoading } from "./departmentSlice";

export const fetchAllDepartments = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response:any = await getAllDepartments();
        console.log("departments Thunk response", response)
        dispatch(setDepartments(response));
        return response.data
    } catch (error) {
        console.error(error)
    }finally{
        dispatch(setLoading(false))
    }
}

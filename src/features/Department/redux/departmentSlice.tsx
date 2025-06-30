import { createSlice } from  "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setDepartments, setLoading } = departmentSlice.actions;
export default departmentSlice.reducer;

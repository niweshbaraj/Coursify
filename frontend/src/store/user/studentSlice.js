import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    studentUser: null,
    studError : false,
    };

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        getStudentSuccess: (state, action) => {
            state.studentUser = action.payload;
            state.studError = false;
        },
        getStudentFailure: (state, action) => {
            state.studError = action.payload;
        },
    },
});

export const { getStudentSuccess, getStudentFailure } = studentSlice.actions;

export default studentSlice.reducer;
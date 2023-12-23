import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    userProfile: null,
    profError : false,
    };

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfileSuccess: (state, action) => {
            state.userProfile = action.payload;
            state.profError = false;
        },
        getProfileFailure: (state, action) => {
            state.profError = action.payload;
        },
    },
});

export const { getProfileSuccess, getProfileFailure } = profileSlice.actions;

export default profileSlice.reducer;
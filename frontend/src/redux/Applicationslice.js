import { createSlice } from "@reduxjs/toolkit"; 

const applicationsSlice = createSlice({
    name: "applications",
    initialState: {
        // backend returns: { job: { applicants: [...] }, success: true }
        // Applicant.jsx stores res.data.job here
        allapplications: { applicants: [] },
    },
    reducers: {
        setsingleApplications: (state, action) => {
            state.allapplications = action.payload;
        },
    },
})

export const { setsingleApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer;

export const applicationslicereducer = applicationsSlice.reducer;
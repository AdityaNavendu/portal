import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    alljobs: [],
    singlejob: null,
    alladminjobs: [],
    searchjobbyText: "",
    allappliedjob: [],
    searchquery: "",
  },
  reducers: {
    setallJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singlejob = action.payload;
    },
    setalladminjobs: (state, action) => {
      state.alladminjobs = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchjobbyText = action.payload;
    },
    setallappliedjob: (state, action) => {
      state.allappliedjob = action.payload;
    },
    setSearchquery: (state, action) => {
      state.searchquery = action.payload;
    },
  },
});

export const { setallJobs, setSingleJob,setalladminjobs,setSearchJob,setallappliedjob,setSearchquery } = jobsSlice.actions;

export default jobsSlice.reducer;
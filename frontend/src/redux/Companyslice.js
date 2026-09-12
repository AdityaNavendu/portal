import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany:{},
        companies:[],
        // keep correct spelling (typo existed earlier)
        searchCompanyByText:"",
        // backward-compat with existing code that might still read the typo
        serachcompanybytext:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setcompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setSearchCompany:(state,action)=>{
            state.searchCompanyByText=action.payload;
            state.serachcompanybytext=action.payload; // backward compat
        }
    }
})


export const { setSingleCompany,setcompanies,setSearchCompany } = companySlice.actions;

export default companySlice.reducer;

export {companySlice}
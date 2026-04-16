import {createSlice} from "@reduxjs/toolkit"

const jobSlice= createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        selectedLocation:"",
        selectedIndustry:"",
        selectedSalary:"",
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs= action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob= action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs= action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText= action.payload;
        },
        setSelectedLocation:(state,action)=>{
            state.selectedLocation= action.payload;
        },
        setSelectedIndustry:(state,action)=>{
            state.selectedIndustry= action.payload;
        },
        setSelectedSalary:(state,action)=>{
            state.selectedSalary= action.payload;
        }
    }
});
export const {setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setSelectedLocation, setSelectedIndustry, setSelectedSalary} = jobSlice.actions;
export default jobSlice.reducer;
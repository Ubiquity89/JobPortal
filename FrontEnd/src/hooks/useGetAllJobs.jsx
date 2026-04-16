import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'

const useGetAllJobs = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
    const fetchAllJobs= async() =>{
      try {
        const res= await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
        console.log("Jobs API response:", res.data);
        if(res.data.success){
          console.log("Jobs data:", res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    }
    fetchAllJobs();
 },[])
}

export default useGetAllJobs

import { useEffect } from 'react'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import { setSingleCompany } from '@/redux/companySlice'

const useGetCompanyById = (companyId) => {
 const dispatch = useDispatch();
 useEffect(()=>{
    const fetchSingleCompany= async() =>{
      try {
        const res= await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
        console.log("Jobs API response:", res.data);
        if(res.data.success){
        //   console.log("Jobs data:", res.data.jobs);
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    }
    fetchSingleCompany();
 },[companyId, dispatch])
}

export default useGetCompanyById

import { useEffect } from 'react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setCompanies } from '@/redux/companySlice'

const useGetAllCompanies = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
    const fetchCompanies= async() =>{
      try {
        const res= await axios.get(`${COMPANY_API_END_POINT}/get-all`);
        console.log("Companies API response:", res.data);
        if(res.data.success){
          // Add job count to each company
          const companiesWithJobCount = res.data.companies.map(company => ({
            ...company,
            jobCount: Math.floor(Math.random() * 10) + 1 // Temporary: random job count
          }));
          dispatch(setCompanies(companiesWithJobCount));
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    }
    fetchCompanies();
 },[])
}

export default useGetAllCompanies

import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable.jsx'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAllApplications } from '../../redux/applicationSlice'
import { useSelector } from 'react-redux'

function Applicants() {
    const params = useParams();
    const dispatch= useDispatch();
    const {applications} = useSelector((state) => state.application) || {};
    console.log("Current Redux applications state:", applications);
    useEffect(()=>{
         const fetchAllApplicants = async () => {
            console.log("Fetching applicants for job ID:", params.id);
            console.log("API endpoint:", `${APPLICATION_API_END_POINT}/${params.id}/applicants`);
            try{
                const res= await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                    withCredentials: true
                });
                console.log("API response:", res.data);
                console.log("Applications data from response:", res.data.applications);
                dispatch(setAllApplications(res.data.applications));
                console.log("Dispatched setAllApplications");
            }catch(error){
                console.log("Error fetching applicants:", error);
            }
         }
         fetchAllApplicants();
    },[params.id])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold'>Applicants ({applications?.length || 0})</h1>
        <ApplicantsTable applicants={applications}/>
      </div>
    </div>
  )
}

export default Applicants

import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
// import { application } from 'express'

function JobDescription() {
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const isIntiallyApplied= singleJob?.applications?.some(application=>application.applicant===user?._id);
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params= useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  

  const applyJobHandler= async() =>{
    try{
      const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      console.log("Apply job response:", res.data);
      if(res.data.success){
        setIsApplied(true);  //update the local state
        const updateSingleJob={...singleJob, applications: [...singleJob.applications, {applicant: user?._id}]};
        dispatch(setSingleJob(updateSingleJob));  //helps us to real time ui update 
        toast.success(res.data.message);
        console.log("Apply job data:", res.data);
      }
    }catch(error){
      console.log("Error applying job:", error);
      toast.error(error.response.data.message);
    }
  }

   useEffect(()=>{
    const fetchSingleJob= async() =>{
      try {
        const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
        console.log("Jobs API response:", res.data);
        if(res.data.success){
          console.log("Jobs data:", res.data.job);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id));
          //ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    }
    fetchSingleJob();
 },[jobId, user ?._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className="bg-slate-100 text-blue-800 font-bold" variant="ghost"> {singleJob?.positions} Positions</Badge>
            <Badge className="bg-slate-200 text-red-700 font-bold" variant="ghost"> {singleJob?.jobType}</Badge>
            <Badge className="bg-slate-200 text-purple-700 font-bold" variant="ghost"> {singleJob?.salary}</Badge>

          </div>
        </div>
      <Button disabled={isApplied} onClick={applyJobHandler} className={`rounded-lg ${isApplied?  'bg-gray-600  text-white cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#560bad] text-white'}`}>{isApplied ? "Applied" : "Apply Now"}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
        <h1 className='font-bold my-1'>Total Applications: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{new Date(singleJob?.createdAt).toLocaleDateString()}</span></h1>
        
      </div>
    </div>
  )
}

export default JobDescription

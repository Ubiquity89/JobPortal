import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '@base-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { useState } from 'react'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'



function AdminJobs() {
  useGetAllAdminJobs();
  const [input,setInput]= useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByText(input));
  },[input]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <Input 
            className='w-fit'
            placeholder="Filter by name"
            onChange={(e)=>setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/admin/jobs/create")} className="bg-black text-white px-4 py-2 rounded-lg">New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs

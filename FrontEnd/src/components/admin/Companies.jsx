import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '@base-ui/react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useState } from 'react'

function Companies() {
  useGetAllCompanies();
  const [input,setInput]= useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input));
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
            <Button onClick={() => navigate("/admin/companies/create")} className="bg-black text-white px-4 py-2 rounded-lg">New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies

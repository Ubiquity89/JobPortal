import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableCaption,TableBody,TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal, Eye } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Applicants from './Applicants'



function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  //for the filter
  const [filteredJobs,setFilteredJobs]= useState(allAdminJobs);
  const navigate= useNavigate();

  useGetAllCompanies();
  
  useEffect(()  => {
   const filteredJobs= allAdminJobs.length>=0 && allAdminJobs.filter((job) => {
    if(!searchJobByText) {
      return true;
    }
    return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
   });
   setFilteredJobs(filteredJobs);
  },[allAdminJobs,searchJobByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs && filteredJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any jobs yet
              </TableCell>
            </TableRow>
          ) : filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                
                <TableCell>
                  {job?.company?.name}
                </TableCell>
                 <TableCell>
                  {job?.title}
                </TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover className="bg-white border shadow-lg rounded-lg" >
                    <PopoverTrigger className="bg-white">
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white border shadow-lg rounded-lg">
                      <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className=' w-4'/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading companies...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable


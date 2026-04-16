import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Mail, Pen, Contact } from 'lucide-react'
import {Badge} from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'


// import Input from './ui/input'

const skills=["Html","css","Javascript","Reactjs"]
const isResume= true;
const haveResume = true;

function Profile() {
const [open,setOpen] =useState(false);
const {user} =useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-center'>

        <div className='flex items-center gap-4'>
        <Avatar className='h-24 w-24'>
            <AvatarImage src={user?.profile?.profilePhoto || ""} alt="Profile" />
            <AvatarFallback>
              {user?.fullname?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
        </Avatar>
        <div>
            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
            <p>{user?.profile?.bio}</p>
        </div>
        </div>
        <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen/>Edit</Button>
        </div>
        <div className='my-5'>

        <div className='flex items-center gap-2 my-2'>
            <Mail/>
            <span>{user?.email}</span>
            </div>
            <div className='flex items-center gap-2 my-2'>

            <Contact/>
            <span>{user?.phone }</span>
            </div>
        </div>
        <div>
            <h1>Skills</h1>
            <div className='flex items-center gap-1'>
            {
                user?.profile?.skills.length!=0? user?.profile?.skills.map((item,index)=> <Badge key={index}>{item}</Badge>): <span>No </span>
            }
            </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md font-bold">Resume</Label>

            {haveResume ? <a target="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <Button>Upload Resume</Button>}
        </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-4'>Applied Jobs</h1>
            {/* Application jobs */}
            <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}></UpdateProfileDialog>
      </div>
  )
}

export default Profile

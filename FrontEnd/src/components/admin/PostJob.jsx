import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Button } from '@base-ui/react'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from '../ui/select'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const companyArray=[];

function PostJob() {
    const [input,setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: ''
    });
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {companies} = useSelector(store => store.company);
    const {user} = useSelector(store => store.auth);
    
    useEffect(() => {
        console.log("Current user in auth state:", user);
        
        // If no user in Redux, redirect to login
        if(!user) {
            console.log("No user in auth state - redirecting to login");
            navigate('/login');
        }
    }, [user, navigate]);
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const selectChangeHandler=(e)=>{
      const value = e.target.value;
      console.log("=== selectChangeHandler called! ===");
      console.log("Selected company value:", value);
      console.log("Available companies:", companies);
      console.log("Companies structure:", companies.map(c => ({ id: c._id, name: c.name })));
      const selectedCompany = companies.find(company => {
        console.log("Comparing:", company.name, "with", value);
        return company && company.name && typeof company.name === 'string' && company.name.toLowerCase() === value.toLowerCase();
      });
      console.log("Found company:", selectedCompany);
      if(selectedCompany) {
        console.log("Setting companyId to:", selectedCompany._id);
        setInput(prevInput => ({
          ...prevInput,
          companyId: selectedCompany._id
        }));
      } else {
        console.log("No company found for value:", value);
      }
    }
    
    const submitHandler = async (e) => {
      e.preventDefault();
      
      // Validation with debugging
      console.log("Current form data:", input);
      console.log("Current input.companyId:", input.companyId);
      console.log("Current input.companyId type:", typeof input.companyId);
      console.log("Current input.companyId value:", input.companyId);
      const missingFields = [];
      if(!input.title) missingFields.push("title");
      if(!input.description) missingFields.push("description");
      if(!input.requirements) missingFields.push("requirements");
      if(!input.salary) missingFields.push("salary");
      if(!input.location) missingFields.push("location");
      if(!input.jobType) missingFields.push("jobType");
      if(!input.experience) missingFields.push("experience");
      if(!input.position) missingFields.push("position");
      if(!input.companyId) missingFields.push("company");
      
      if(missingFields.length > 0){
        console.log("Missing fields:", missingFields);
        toast.error(`Please fill these fields: ${missingFields.join(", ")}`);
        return;
      }
      
      console.log("Submitting job data:", input);
      console.log("API endpoint:", `${JOB_API_END_POINT}/post`);
      setLoading(true);
      try{
        const res= await axios.post(`${JOB_API_END_POINT}/post`,input,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        console.log("API Response:", res.data);
        if(res.data.success){
          toast.success(res.data.message);
          navigate("/admin/jobs");
        }
      }
      catch(error){
        console.error("Full error:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong") ;
      }
      finally{
        setLoading(false);
      }
    }
  return (


    <div>
      <Navbar/>
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 rounded-lg shadow-sm'>

        <div className='grid grid-cols-2 gap-4'>
          
        <div>
          <Label>Title</Label>
          <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>Requirements</Label>
          <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>Salary</Label>
          <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>Location</Label>
          <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>Job Type</Label>
          <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>Experience</Label> 
          <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
         <div>
          <Label>No of Positions</Label>
          <Input type="text" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 my-1" />   
        </div>
        
        {
          companies.length >0 && (
           <Select onChange={selectChangeHandler}>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  companies.map((company) => {
                    return (
                      <SelectItem key={company._id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    )
                  }) 
                }
              </SelectGroup>
            </SelectContent>
           </Select>
          )
        }
        </div>
        
        {
          companies.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Please add at least one company</p>
          )
        }
        
         {loading ? (
                      <Button type="submit" disabled className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full my-4 bg-black text-white">
                        Post Job
                      </Button>
                    )}
        </form>
      </div>
    </div>  
    
  )
}

export default PostJob

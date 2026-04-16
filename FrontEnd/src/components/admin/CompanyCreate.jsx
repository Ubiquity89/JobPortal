import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'
import { toast } from 'sonner'

function CompanyCreate() {
    //to navigate to diff pages..use useNavigate
    const navigate= useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async() => {
        //logic to register new company
        try{
            const token = localStorage.getItem('authToken');
            const res= await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company));
                toast.success(res.data.message);
                const companyId= res?.data?.company?._id;
                navigate(`/admin/companies/  ${companyId}`);
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10 '>
            <h1 className='text-2xl font-bold'>Your Company Name</h1>
            <p className='text-gray-600'>Add your company details to get started</p>
            <div>
                <Label>Company Name</Label>
                <Input type='text' className="my-2" placeholder='Enter company name' 
                onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>
            <div className='flex gap-4'>
                <Button onClick={() => navigate('/admin/companies')} className="bg-gray-200 text-black hover:bg-gray-300" variant="outline">Cancel</Button>
                <Button onClick={registerNewCompany} className="bg-black text-white hover:bg-blue-700">Continue</Button>
            </div>
        </div> 
      </div>
    </div>
  )
}

export default CompanyCreate
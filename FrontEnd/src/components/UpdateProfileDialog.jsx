import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'


const UpdateProfileDialog= ({open,setOpen})=> {
  //setting up loading locally
  const [loading,setLoading] =useState(false);
  
  //update the user
  //we need to get the prev info of user in the update form 
  const {user}= useSelector(store => store.auth);


//filling the info of the user in the form
  const [input,setInput] = useState({
    fullname:user?.fullname || '',
    email:user?.email || '',
    phoneNumber:user?.phoneNumber || '',
    bio:user?.profile?.bio || '',
    skills:user?.profile?.skills?.join(', ') || '',
    file:user?.profile?.resume || null
  });

  //we need to update the user info in global redux state ..for that we will use dispatch so it gets updated with the recent user info
  const dispatch = useDispatch();
//handle the change of event with event handler
  const changeEventHandler =(e) =>{
    setInput({...input,[e.target.name]:e.target.value });
  }

  //for file change handling
  const fileChangeHandler=(e) =>{
    const file = e.target.files?.[0];
    setInput({...input,file});
  }

  //submitHandler
  const submitHandler=async(e)=> {
    //to prevent the default behavior of the form
    e.preventDefault();
    console.log("Form input data:", input); // Log the input state
    const formData = new FormData();
    formData.append('fullname',input.fullname);
    formData.append('email',input.email);
    formData.append('phoneNumber',input.phoneNumber);
    formData.append('bio',input.bio);
    formData.append('skills',input.skills);
    if(input.file) {
      formData.append('file',input.file);
    }
    
    // Log FormData contents properly
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try{
      setLoading(true);
      const res= await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      });
      if(res.data.success){
        //update the user in global redux state
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
      console.log(res.data);
    }catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
    setOpen(false);
    console.log(formData);
  }
  return (
    <div>

    <Dialog open={open} onOpenChange={setOpen}>
       <DialogContent className="bg-white sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>

            <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="name" className="text-right">Name</Label>
<Input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className='col-span-3' />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="email" className="text-right">Email</Label>
<Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="number" className="text-right">Number</Label>
<Input id="number" name="phoneNumber" type="number" value={input.phoneNumber} onChange={changeEventHandler} className='col-span-3'  />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="bio" className="text-right">Bio</Label>
<Input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} className='col-span-3'  />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="skills" className="text-right">Skills</Label>
<Input id="skills" name="skills" type="text" className='col-span-3' value={input.skills} onChange={changeEventHandler} />
            </div>

             <div className='grid grid-cols-4 items-center gap-4'> 
<Label htmlFor="file" className="text-right">Resume</Label>
<Input id="file" name="file" accept="application/pdf" type="file" className='col-span-3' onChange={fileChangeHandler} />
            </div>
              </div>
            <DialogFooter>

    {loading ? (
      <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white">
              Update Profile
            </Button>
          )}
          </DialogFooter>
        </form>
       </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateProfileDialog

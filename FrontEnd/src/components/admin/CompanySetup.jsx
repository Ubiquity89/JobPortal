import React from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import useGetCompanyById from "@/hooks/useGetCompanyById";

function CompanySetup() {
  const params= useParams();
  useGetCompanyById(params.id );
  const [input, setInput] = React.useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany} = useSelector((store) => store.company);
  const [loading, setLoading] = React.useState(false);
  // const params= useParams();
  const navigate= useNavigate();
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const file= e.target.files?.[0];
    setInput({
      ...input,file
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData= new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if(input.file){
      // upload the file
      formData.append("file", input.file);
    }
    try{
        setLoading(true);
        const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        if(res.data.success){
         toast.success(res.data.message); 
         navigate("/admin/companies");  
        }
    }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
        setLoading(false);
    }
  };

  useEffect(()=>{
    setInput({
      name: singleCompany?.name|| "",
    description: singleCompany?.description|| "",
    website: singleCompany?.website|| "",
    location: singleCompany?.location|| "",
    file: null,
    })
  },[singleCompany])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl my-10">
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4">
            <Button
            onClick={()=> navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </div>
          <h1 className="text-xl font-bold">Company Setup</h1>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="outline-2 outline-gray-300"
                />
              </div>
              
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="outline-2 outline-gray-300"
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="outline-2 outline-gray-300"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="outline-2 outline-gray-300"
                />
              </div>
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="outline-2 outline-gray-300"
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full mt-8" disabled={loading}>
          </Button>
           {loading ? (
                      <Button className="w-full my-4">
                        {" "}
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full my-4 bg-black text-white">
                        Update
                      </Button>
                    )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;

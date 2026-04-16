import React from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "@base-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  //for getting the user info
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Signup failed",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <div>
              <Label className="my-3">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label className="my-3">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label className="my-3">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label className="my-3">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center just">
              {/* <Label className="my-3">Role</Label> */}
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role == "student"}
                  value="student"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="student">Student</Label>
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
                <div className="flex items-center gap-6">
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                  ></Input>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white">
              Signup
            </Button>
          )}
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;

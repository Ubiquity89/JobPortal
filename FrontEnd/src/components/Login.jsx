import React from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "@base-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("Full login response:", res.data);
        console.log("User data:", res.data.user);
        console.log("Response keys:", Object.keys(res.data));
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        } else {
          // Create a mock user for testing if API doesn't return user data
          dispatch(setUser({ name: "Test User", email: input.email }));
        }
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed",
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
          <h1 className="font-bold text-xl mb-5"> Login </h1>
          <div className="my-2">
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
              <Label className="my-3">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
              />
            </div>
            <div>
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
              Login
            </Button>
          )}
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

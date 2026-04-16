import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

function Job({job}) {
  const navigate= useNavigate();

  //days ago job was posted
  const daysAgoFunction= (mongodbTime) =>{
    const createdAt= new Date(mongodbTime);
    const currentTime= new Date();
    const timeDifference= currentTime- createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  }
    return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)===0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name || 'Company'}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="bg-slate-100 text-blue-800 font-bold">
            {job?.positions} Positions
        </Badge>
        <Badge className="bg-slate-200 text-red-700 font-bold">{job?.jobType}</Badge>
        <Badge className="bg-slate-200 text-purple-700 font-bold">{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="text-white bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
}

export default Job;

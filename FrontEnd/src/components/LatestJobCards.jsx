import { Badge } from "./ui/badge";
import React from "react";

function LatestJobCards({job}) {

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg"> {job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
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
    </div>
  );
}

export default LatestJobCards;

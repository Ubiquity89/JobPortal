import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MapPin, Globe, Users } from "lucide-react";

function CompanyCard({ company }) {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src={company?.logo} className="object-cover" />
          </Avatar>
          <div>
            <h1 className="font-bold text-xl text-gray-800">{company?.name}</h1>
            <p className="text-sm text-gray-500">Company</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{company?.location || 'Location not specified'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className="w-4 h-4" />
          <a 
            href={company?.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline hover:text-blue-800"
          >
            {company?.website || 'Website not available'}
          </a>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">Posted Jobs: {company?.jobCount || 0}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {company?.description || 'No description available'}
        </p>
      </div>

      <div className="flex gap-3">
        <Link to={`/companies/${company?._id}/jobs`} className="flex-1">
          <Button className="w-full bg-[#6A38C2] hover:bg-[#43198b] text-white">
            View Jobs
          </Button>
        </Link>
        <Link to={`/companies/${company?._id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CompanyCard;

import React from "react";
// import { Table, TableCaption } from '../shared/ui/table'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const shortlistStatus = ["Accepted", "Rejected"];
function ApplicantsTable({applicants}) {
  console.log("ApplicantsTable received applicants:", applicants);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="float-right cursor-pointer" >Actions</TableHead>
          </TableRow>
        </TableHeader>

          <TableBody>
            {
                applicants && applicants?.map((item)=>(
                    <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname || 'N/A'}</TableCell>
              <TableCell>{item?.applicant?.email || 'N/A'}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                ) : 'No Resume'}
              </TableCell>
              <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent  className="w-32 bg-white text-black">
                    {shortlistStatus.map((status, index) => {
                        return (
                            <div key={index} className="flex w-fit items-center my-2 cursor-pointer"><span>{status}</span></div>
                        )
                    }
                        
                    )}
                   
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
                ))
            }
            
          </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;

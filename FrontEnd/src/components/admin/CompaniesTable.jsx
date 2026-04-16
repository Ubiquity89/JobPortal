import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableCaption,TableBody,TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
  const { companies ,searchCompanyByText} = useSelector(store => store.company);
  //for the filter
  const [filterCompany,setFilterCompany]= useState(companies);
  const navigate= useNavigate();

  useGetAllCompanies();
  
  useEffect(()  => {
   const filteredCompany= companies.length>=0 && companies.filter((company) => {
    if(!searchCompanyByText) {
      return true;
    }
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
   });
   setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies && companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any companies yet
              </TableCell>
            </TableRow>
          ) : filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || ""} />
                    <AvatarFallback>{company.name?.charAt(0).toUpperCase() || "CN"}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  {company.name}
                </TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading companies...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable

import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
import { Badge } from './ui/badge'

function AppliedJobTable() {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Job Title</TableHead>
            <TableHead className="font-semibold text-gray-900">Company</TableHead>
            <TableHead className="font-semibold text-gray-900">Applied Date</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b transition-colors hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Frontend Developer</TableCell>
            <TableCell className="text-gray-700">Google</TableCell>
            <TableCell className="text-gray-600">2025-10-10</TableCell>
            <TableCell>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                Applied
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow className="border-b transition-colors hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Backend Developer</TableCell>
            <TableCell className="text-gray-700">Microsoft</TableCell>
            <TableCell className="text-gray-600">2025-10-08</TableCell>
            <TableCell>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                Under Review
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow className="border-b transition-colors hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Full Stack Developer</TableCell>
            <TableCell className="text-gray-700">Amazon</TableCell>
            <TableCell className="text-gray-600">2025-10-05</TableCell>
            <TableCell>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Interview
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

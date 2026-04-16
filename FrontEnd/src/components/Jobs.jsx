import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

function Jobs() {
  const { allJobs, searchJobByText, selectedLocation, selectedIndustry, selectedSalary } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      // Search filter
      const matchesSearch = !searchJobByText || 
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.description?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.location?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.jobType?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.experienceLevel?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());

      // Location filter
      const matchesLocation = !selectedLocation || 
        job?.location?.toLowerCase().includes(selectedLocation.toLowerCase());

      // Industry filter (based on job title)
      const matchesIndustry = !selectedIndustry || 
        job?.title?.toLowerCase().includes(selectedIndustry.toLowerCase());

      // Salary filter
      const matchesSalary = !selectedSalary || (() => {
        const jobSalary = parseInt(job?.salary) || 0;
        if (selectedSalary === "0-5 LPA") return jobSalary >= 0 && jobSalary <= 5;
        if (selectedSalary === "5-10 LPA") return jobSalary > 5 && jobSalary <= 10;
        if (selectedSalary === "10-15 LPA") return jobSalary > 10 && jobSalary <= 15;
        if (selectedSalary === "15-20 LPA") return jobSalary > 15 && jobSalary <= 20;
        return true;
      })();

      return matchesSearch && matchesLocation && matchesIndustry && matchesSalary;
    });
    setFilteredJobs(filtered);
  }, [allJobs, searchJobByText, selectedLocation, selectedIndustry, selectedSalary]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            {/*filter page*/}
            <FilterCard />
          </div>
          {/*job card*/}
          <div className="flex-1">
            {/* Display active filters */}
            {(searchJobByText || selectedLocation || selectedIndustry || selectedSalary) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Active Filters:</h2>
                <div className="flex flex-wrap gap-2">
                  {searchJobByText && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Search: "{searchJobByText}"
                    </span>
                  )}
                  {selectedLocation && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Location: {selectedLocation}
                    </span>
                  )}
                  {selectedIndustry && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Industry: {selectedIndustry}
                    </span>
                  )}
                  {selectedSalary && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      Salary: {selectedSalary}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                </p>
              </div>
            )}
            
            {filteredJobs.length <= 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <span className="text-xl font-medium text-gray-600">
                    {searchJobByText || selectedLocation || selectedIndustry || selectedSalary 
                      ? 'No jobs found matching your filters' 
                      : 'Job Not Found'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {filteredJobs.map((job) => (
                    <div key={job?._id}>
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;

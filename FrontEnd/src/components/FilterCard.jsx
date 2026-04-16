import React from "react";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocation, setSelectedIndustry, setSelectedSalary } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    stateKey: "selectedLocation",
    action: setSelectedLocation
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    stateKey: "selectedIndustry", 
    action: setSelectedIndustry
  },
  {
    filterType: "Salary",
    array: ["0-5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA"],
    stateKey: "selectedSalary",
    action: setSelectedSalary
  },
];

function FilterCard() {
  const dispatch = useDispatch();
  const { selectedLocation, selectedIndustry, selectedSalary } = useSelector(store => store.job);

  const handleFilterChange = (filterType, value, action) => {
    dispatch(action(value));
  };

  const clearFilter = (filterType, action) => {
    dispatch(action(""));
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <div>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              <button 
                onClick={() => clearFilter(data.filterType, data.action)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </div>
            {data.array.map((item, itemIndex) => {
              const isChecked = 
                data.filterType === "Location" && selectedLocation === item ||
                data.filterType === "Industry" && selectedIndustry === item ||
                data.filterType === "Salary" && selectedSalary === item;
                
              return (
                <div className="flex items-center space-x-2 my-2">
                  <input
                    type="radio"
                    name={data.filterType}
                    value={item}
                    id={`${data.filterType}-${item}`}
                    className="cursor-pointer"
                    checked={isChecked}
                    onChange={() => handleFilterChange(data.filterType, item, data.action)}
                  />
                  <Label htmlFor={`${data.filterType}-${item}`} className="cursor-pointer">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;

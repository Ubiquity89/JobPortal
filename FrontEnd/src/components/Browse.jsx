import React from 'react'
import Navbar from './shared/Navbar'
import CompanyCard from './CompanyCard'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

function Browse() {
  useGetAllCompanies();
  const { companies } = useSelector(store => store.company);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-2xl my-10'>
          Browse Companies ({companies?.length || 0})
        </h1>
        
        {companies?.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='text-gray-400 text-6xl mb-4'>Building</div>
              <h2 className='text-xl font-semibold text-gray-600'>No Companies Found</h2>
              <p className='text-gray-500 mt-2'>Check back later for new companies</p>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {companies?.map((company, index) => (
              <CompanyCard key={company?._id || index} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse

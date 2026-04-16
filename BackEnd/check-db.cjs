const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal')
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Check all companies
  const Company = require('./models/company.model');
  const companies = await Company.find({});
  console.log('All companies:');
  companies.forEach(company => {
    console.log(`ID: ${company._id}, Name: ${company.name}`);
  });
  
  // Check the specific company ID from your job
  const specificCompany = await Company.findById('69ca7651f859526cd7822eec');
  console.log('\nSpecific company (69ca7651f859526cd7822eec):', specificCompany);
  
  // Check all jobs and their company references
  const Job = require('./models/job.model');
  const jobs = await Job.find({}).populate('company');
  console.log('\nJobs with populated companies:');
  jobs.forEach(job => {
    console.log(`Job: ${job.title}, Company: ${job.company ? job.company.name : 'NOT FOUND'}`);
  });
  
  process.exit(0);
})
.catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});

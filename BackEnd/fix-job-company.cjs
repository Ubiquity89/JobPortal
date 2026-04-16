const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal')
.then(async () => {
  console.log('Connected to MongoDB');
  
  const Job = require('./models/job.model');
  
  // Your job ID that needs fixing
  const jobId = '69ca7651f859526cd7822ef1';
  
  // Choose one of these valid company IDs:
  const validCompanies = [
    { id: '69caad2f160d9c2ef5119645', name: 'Aisha Pvt LTD' },
    { id: '69de71c445012688fe40fd93', name: 'Microsoft' },
    { id: '69de722245012688fe40fd9a', name: 'Google' }
  ];
  
  // Let's use Microsoft as an example (you can change this)
  const selectedCompany = validCompanies[1]; // Microsoft
  
  console.log(`Updating job ${jobId} to use company: ${selectedCompany.name}`);
  
  // Update the job
  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { company: selectedCompany.id },
    { new: true }
  ).populate('company');
  
  if (updatedJob) {
    console.log('Job updated successfully!');
    console.log(`Job: ${updatedJob.title}`);
    console.log(`New Company: ${updatedJob.company.name}`);
    console.log(`Company ID: ${updatedJob.company._id}`);
  } else {
    console.log('Job not found with ID:', jobId);
  }
  
  process.exit(0);
})
.catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});

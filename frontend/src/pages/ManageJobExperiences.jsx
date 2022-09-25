import { useState } from "react"
import JobExperienceList from "../components/Admin/JobExperienceList";
import JobExperienceForm from "../components/Admin/JobExperienceForm";
import { JobExperienceProvider } from "../context/JobExperienceProvider";



const ManageJobExperiences = () => {
  return (
    <JobExperienceProvider>
        <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <JobExperienceForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <JobExperienceList/>
      </div>
    </div>

    </JobExperienceProvider>
  )
}

export default ManageJobExperiences

import { useState } from "react";
import JobPositionList from "../components/Admin/JobPositionList";
import JobPositionForm from '../components/Admin/JobPositionForm';
import { JobPositionProvider } from "../context/JobPositionProvider";
const ManageJobPositions = () => {
  return (
    <JobPositionProvider>
    <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <JobPositionForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <JobPositionList/>
      </div>
    </div>
    </JobPositionProvider>
  )
}

export default ManageJobPositions

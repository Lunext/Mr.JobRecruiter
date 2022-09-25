import { useState } from "react"

import CandidateForm from "../components/Admin/CandidateForm";
import { CandidateProvider } from "../context/CandidateProvider";
import CandidateList from '../components/Admin/CandidateList';
import JobPosition from "../components/Admin/JobPosition";import { JobPositionProvider } from "../context/JobPositionProvider";

const ManageCandidates = () => {
  return (
    <JobPositionProvider>
    <CandidateProvider>
        <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <CandidateForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <CandidateList/>
      </div>
    </div>
    </CandidateProvider>
    </JobPositionProvider>
  )
}

export default ManageCandidates;

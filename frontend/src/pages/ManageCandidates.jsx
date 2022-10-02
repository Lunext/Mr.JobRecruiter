import { useState } from "react"

import CandidateForm from "../components/Admin/CandidateForm";
import { CandidateProvider } from "../context/CandidateProvider";
import CandidateList from '../components/Admin/CandidateList';
import JobPosition from "../components/Admin/JobPosition";
import { JobPositionProvider } from "../context/JobPositionProvider";
import {DepartmentProvider} from '../context/DepartmentProvider';
import { CompetenceProvider } from "../context/CompetenceProvider";
import { TrainingProvider } from "../context/TrainingProvider";
import { JobExperienceProvider } from "../context/JobExperienceProvider";
import { LanguageProvider } from "../context/LanguageProvider";

const ManageCandidates = () => {
  
  return (
    <CandidateProvider>
    <JobPositionProvider>
    
    <LanguageProvider>
    <DepartmentProvider>
    <CompetenceProvider>
    <TrainingProvider>
    <JobExperienceProvider>
        <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <CandidateForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <CandidateList/>
      </div>
     
    </div>
    </JobExperienceProvider>
    </TrainingProvider>
    </CompetenceProvider>
    </DepartmentProvider>
    </LanguageProvider>
    </JobPositionProvider>
    </CandidateProvider>
  )
}

export default ManageCandidates;

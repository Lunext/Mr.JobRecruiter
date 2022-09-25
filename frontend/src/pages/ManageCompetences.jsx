import { useState } from "react";
import CompetenceList from "../components/Admin/CompetenceList";
import CompetenceForm from "../components/Admin/CompetenceForm";
import { CompetenceProvider } from "../context/CompetenceProvider";



const ManageCompetences = () => {
  return (
    <CompetenceProvider>
    <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <CompetenceForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <CompetenceList/>
      </div>

    </div>
    </CompetenceProvider>
  
  )
}

export default ManageCompetences;

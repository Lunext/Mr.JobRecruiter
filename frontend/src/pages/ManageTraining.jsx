import { useState } from "react";
import TrainingList from "../components/Admin/TrainingList";
import TrainingForm from "../components/Admin/TrainingForm";
import { TrainingProvider } from "../context/TrainingProvider";

const ManageTraining = () => {
  return (
    <TrainingProvider>
    <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <TrainingForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <TrainingList/>
      </div>
    </div>
    </TrainingProvider>
    
  )
}

export default ManageTraining;

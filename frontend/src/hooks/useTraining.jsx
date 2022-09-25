import { useContext } from "react";
import TrainingContext from "../context/TrainingProvider";

const useTraining = () =>  useContext(TrainingContext); 
 
export default useTraining;

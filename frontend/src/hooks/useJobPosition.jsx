import { useContext } from "react";
import JobPositionContext from "../context/JobPositionProvider";

const useJobPosition=()=> useContext(JobPositionContext); 

export default useJobPosition; 

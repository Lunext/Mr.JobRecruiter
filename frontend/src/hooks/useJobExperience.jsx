import { useContext } from "react";
import JobExperienceContext from "../context/JobExperienceProvider";
const useJobExperience = () => useContext(JobExperienceContext);
 
export default useJobExperience;

import { useContext } from "react";
import CompetenceContext from "../context/CompetenceProvider";

const useCompetence=()=> useContext(CompetenceContext); 

export default useCompetence;

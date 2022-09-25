import { useContext } from "react";
import CandidateContext from "../context/CandidateProvider";

const useCandidate=()=> useContext(CandidateContext); 

export default useCandidate;

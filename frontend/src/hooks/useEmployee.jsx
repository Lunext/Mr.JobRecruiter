import { useContext } from "react"
import EmployeeContext from "../context/EmployeeProvider"


const useEmployee = () => useContext(EmployeeContext); 
export default useEmployee;

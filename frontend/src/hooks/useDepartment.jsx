import { useContext } from "react"
import DepartmentContext from "../context/DepartmentProvider"

const useDepartment = () =>  useContext(DepartmentContext); 




export default useDepartment;

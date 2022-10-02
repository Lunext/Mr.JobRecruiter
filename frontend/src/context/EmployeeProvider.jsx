import { createContext, useState, useEffect } from "react"; 
import axiosClient from "../config/axios";

const EmployeeContext=createContext(); 
const EmployeeProvider = ({children}) => {

    const[employees,setEmployees]=useState([]); 
    const[employee, setEmployee]=useState({}); 
    const[candidates, setCandidates]=useState([]); 
    const[candidate, setCandidate]=useState({});

    useEffect(()=>{
        getEmployees();
    },[]);
    const getEmployees=async()=>{
        try {
            const token=localStorage.getItem('token'); 
            if(!token) return; 

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const{data}=await axiosClient('/employees',config); 
            setEmployees(data); 
            
        } catch (error) {
            console.log(error); 
            
        }
    }

    const saveEmployee=async(employee)=>{
        const token=localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(employee.id){
            try {
                const{data}= await axiosClient.put(`/employees/${employee.id}`, employee,config); 
                const updatedEmployee=employees.map(employeeState=>employeeState._id===data._id?data:employeeState);
                setEmployees(updatedEmployee); 
                getEmployees(); 
                
            } catch (error) {
                console.log(error); 
                return false; 
                
            }
        }else{
            try {
                const{data}=await axiosClient.post('/employees',employee,config); 
                const{createdAt,updatedAt,__v,...savedEmployee}=data; 
                setEmployees([savedEmployee,...employees]);
                getEmployees();
                
            } catch (error) {
                console.log(error.response.data.msg); 
                return false; 
                
            }
        }
        return true; 

    }
    const setEdit=(employee)=>setEmployee(employee); 
    const deleteEmployee=async id=>{
        const confirma=confirm('Esta seguro que quiere eleiminar este empleado?');
        if(confirma){
            try {
                const token=localStorage.getItem('token'); 
                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient.delete(`/employees/${id}`,config); 
                const updatedEmployees= employees.filter(employeesState=>employeesState._id!==id);
                setEmployees(updatedEmployees); 
                
            } catch (error) {
                console.log(error); 
                
            }
        }
    }
  return (
    <EmployeeContext.Provider
                value={{
                    employees, 
                    saveEmployee, 
                    setEdit,
                    employee, 
                    deleteEmployee

                }}>
                    {children}

    </EmployeeContext.Provider>
  )
}

export{
    EmployeeProvider
}
export default EmployeeContext;

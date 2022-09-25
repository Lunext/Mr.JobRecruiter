import {createContext, useState, useEffect} from 'react'; 
import axiosClient from '../config/axios';

const DepartmentContext=createContext(); 
const DepartmentProvider=({children})=>{
    const[departments, setDepartments]=useState([]); 
    const[department,setDepartment]=useState({}); 

    useEffect(()=>{
        const getDepartments=async()=>{
            try{
                const token=localStorage.getItem('token'); 
                if(!token) return ;

                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data}= await axiosClient('/departments',config);
                setDepartments(data); 


            }catch(error){
                console.log(error); 

            }
        }
        getDepartments(); 
    },[]);

    const saveDepartment=async(department)=>{
        const token= localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(department.id){
            try{
                const{data}=await axiosClient.put(`/departments/${department.id}`, department,config);
                const updatedDepartment=departments.map(
                    departmentState=>departmentState._id===data._id?data:departmentState);
                    setDepartments(updatedDepartment); 
            }catch(error){
                console.log(error); 
                return false; 
            }
        }else{
            try{
                const{data}=await axiosClient.post('/departments',department,config);
                const{createdAt,updatedAt,__v,...savedDepartment}=data; 
                setDepartments([savedDepartment,...departments]);
            }catch(error){
                console.log(error.response.data.msg); 
                return false; 
            }
        }
        return true; 

    }
    const setEdit= (department)=> setDepartment(department);
     
    const deleteDepartment=async id=>{
        const confirma=confirm('Esta seguro que quiere eliminarla?');
        if(confirma){
            try{
                const token=localStorage.getItem('token'); 
                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient.delete(`/departments/${id}`,config);
                const updatedDepartments=departments.filter(
                    departmentsState=>departmentsState._id!==id);
                setDepartments(updatedDepartments);
            }catch(error){
                console.log(error);
            }
        }
    }

    return(
        <DepartmentContext.Provider
            value={{
                departments,
                saveDepartment,
                setEdit, 
                department, 
                deleteDepartment
            }}
        >
            {children}
        </DepartmentContext.Provider>
    )
}

export{
    DepartmentProvider
}
export default DepartmentContext;
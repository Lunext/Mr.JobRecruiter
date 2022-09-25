import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";

const JobPositionContext=createContext(); 
const JobPositionProvider = ({children}) => {

    const[jobPositions, setJobPositions]=useState([]); 
    const[jobPosition, setJobPosition]=useState({}); 

    useEffect(()=>{
        const getJobPositions=async()=>{
            try{
                const token=localStorage.getItem('token'); 
                if(!token) return; 

                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient('/jobPositions',config);
                setJobPositions(data); 
            }catch(error){
                console.log(error); 
            }
        }
        getJobPositions();
    },[]);
    const saveJobPosition=async(jobPosition)=>{
        const token=localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }
        if(jobPosition.id){
            try{
                const{data}=await axiosClient.put(`/jobPositions/${jobPosition.id}`, jobPosition,config);
                const updatedJobPosition=jobPositions.map(
                    jobPositionState=>jobPositionState._id===data._id?data:jobPositionState
                );
                setJobPositions(updatedJobPosition);
            }catch(error){
                console.log(error); 
                return false; 
            }
        }else{
            try{
                const{data}= await axiosClient.post('/jobPositions',jobPosition,config); 
                const{createdAt,updatedAt,__v,...savedJobPosition}=data; 

                setJobPositions([savedJobPosition, ...jobPositions]);

            }catch(error){
                console.log(error.response.data.msg); 
                return false;

            }
        }
        return true;
    }
    const setEdit=(jobPosition)=>setJobPosition(jobPosition); 

    const deleteJobPosition= async id=>{
        const confirma=confirm('Está seguro que quiere eliminarla?'); 
        if(confirma){
            try{
                const token=localStorage.getItem('token'); 
                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient.delete(`/jobPositions/${id}`, config); 
                const updatedJobPositions=jobPositions.filter(jobPositionsState=>jobPositionsState._id!==id);
                
                setJobPositions(updatedJobPositions); 
            }catch(error){
                console.log(error); 
            }
        }
    }
  return (
    <JobPositionContext.Provider
        value={{
            jobPositions,
            saveJobPosition,
            setEdit, 
            jobPosition, 
            deleteJobPosition
        }}
    >
            {children}

    </JobPositionContext.Provider>
  )
}
export{
    JobPositionProvider
}
export default JobPositionContext;

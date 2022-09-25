import axios from 'axios'; 
import {createContext, useState, useEffect} from 'react'; 
import axiosClient from '../config/axios';

const JobExperienceContext=createContext(); 
const JobExperienceProvider=({children})=>{
    
    const[jobExperiences, setJobExperiences]=useState([]); 
    const [jobExperience, setJobExperience]=useState({}); 


useEffect(()=>{
    const getJobExperiences=async()=>{
        try{
            const token=localStorage.getItem('token'); 
            if(!token) return; 

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data}=await axiosClient('/jobExperiences',config);

            setJobExperiences(data); 
        }
        catch(error){
            console.log(error); 
        }
        
    }
},[]);

const saveJobExperience=async(jobExperience)=>{
    const token=localStorage.getItem('token'); 
    const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    }
    if(jobExperience.id){
        try{
            const{data}=await axiosClient.put(`/jobExperiences/${jobExperience.id}`,jobExperience,config); 
            const updatedJobExperience=jobExperiences.map(jobExperienceState=>jobExperienceState._id===data._id?data:jobExperienceState);
            setJobExperiences(updatedJobExperience);

        }catch(error){
            console.log(error); 
            return false; 
        }
    }else{
        try {
            const{data}=await axiosClient.post('/jobExperiences',jobExperience,config);
            const{createdAt,updatedAt,__v,...savedJobExperience}=data; 
            setJobExperiences([savedJobExperience,...jobExperiences]);
        } catch (error) {
            console.log(error.response.data.msg); 
            return false;
            
        }
    }
    return true;
}
const setEdit=(jobExperience)=>setJobExperience(jobExperience);

const deleteJobExperience=async id=>{
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
            const{data}=await axiosClient.delete(`/jobExperiences/${id}`, config); 
            const updatedJobExperiences=jobExperiences.filter(jobExperiencesState=>jobExperiencesState._id!==id);
            setJobExperiences(updatedJobExperiences);

        }catch(error){
            console.log(error);
        }
    }
}
 return(
    <JobExperienceContext.Provider
    value={{
        jobExperiences,
        saveJobExperience,
        setEdit,
        jobExperience, 
        deleteJobExperience
    }}>
        {children}
    </JobExperienceContext.Provider>
 )

}
export{
    JobExperienceProvider
}
export default JobExperienceContext;




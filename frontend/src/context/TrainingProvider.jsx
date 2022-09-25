
import { createContext, useState, useEffect } from "react"; 
import axiosClient from "../config/axios";

const TrainingContext=createContext(); 
const TrainingProvider = ({children}) => {
    const[trainings, setTrainings]=useState([]); 
    const[training, setTraining]=useState({}); 

    useEffect(()=>{
        const getTrainings=async()=>{
            try {
                const token=localStorage.getItem('token'); 
                if(!token) return; 

                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient('/trainings', config); 
                setTrainings(data); 
                
            } catch (error) {
                console.log(error); 
            }
        }
        getTrainings(); 
    },[]);
    
    const saveTraining=async(training)=>{
        const token=localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }
        if(training.id){
            try {
                const{data}=await axiosClient.put(`/trainings/${training.id}`, training,config); 
                const updatedTraining=trainings.map(trainingState=>trainingState._id===data._id?data:trainingState); 
                setTrainings(updatedTraining);                 
            } catch (error) {
                console.log(error); 
                return false; 
            }
        }else{
            try {
                const{data}=await axiosClient.post('/trainings',training,config); 
                const{createdAt,updatedAt,__v,...savedTraining}=data; 
                setTrainings([savedTraining,...trainings]); 
                
            } catch (error) {
                console.log(error.response.data.msg); 
                return false; 
                
            }
        }
        return true; 
    }
    const setEdit=(training)=>setTraining(training); 
    const deleteTraining=async id=>{
        const confirma=confirm('Esta seguro que quiere eliminarla?'); 
        if(confirma){
            try {
                const token=localStorage.getItem('token'); 
                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data}=await axiosClient.delete(`/trainings/${id}`,config); 
                const updatedTrainings= trainings.filter(trainingsState=>trainingsState._id!==id); 
                setTrainings(updatedTrainings); 
                
            } catch (error) {
                console.log(error); 
                
            }
        }
    }
  return (
    <TrainingContext.Provider
        value={{
            trainings,
            saveTraining, 
            setEdit,
            training, 
            deleteTraining
        }}
    >
        {children}

    </TrainingContext.Provider>
  )
}
export{
    TrainingProvider
}
export default TrainingContext; 

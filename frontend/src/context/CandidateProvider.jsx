import { createContext, useState, useEffect } from "react"; 
import axiosClient  from "../config/axios";


const CandidateContext=createContext(); 
const CandidateProvider = ({children}) => {

    const[candidates, setCandidates]=useState([]); 
    const[candidate, setCandidate]=useState({});
    
    useEffect(()=>{
        getCandidates();
    },[]);
    const getCandidates=async()=>{
        try {
            const token=localStorage.getItem('token'); 
            if(!token) return; 

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const{data}=await axiosClient('/candidates', config); 
            setCandidates(data); 
            
        } catch (error) {
            console.log(error); 
        }
    }
    

    const saveCandidate=async(candidate)=>{
        const token=localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }
        if(candidate.id){
            try {
                const{data}=await axiosClient.put(`/candidates/${candidate.id}`, candidate,config); 
                const updatedCandidate=candidates.map(candidateState=>candidateState._id===data._id?data:candidateState); 
                setCandidates(updatedCandidate);
                 getCandidates();                 
            } catch (error) {
                console.log(error); 
                return false; 
            }
        }else{
            try {
                const{data}=await axiosClient.post('/candidates',candidate,config); 
                const{createdAt,updatedAt,__v,...savedCandidate}=data; 
                setCandidates([savedCandidate,...candidates]); 
                getCandidates();
                
            } catch (error) {
                console.log(error.response.data.msg); 
                return false; 
                
            }
        }
        return true; 
    }
    const setEdit=(candidate)=>setCandidate(candidate); 
    const deleteCandidate=async id=>{
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
                const{data}=await axiosClient.delete(`/candidates/${id}`,config); 
                const updatedCandidates= candidates.filter(candidatesState=>candidatesState._id!==id); 
                setCandidates(updatedCandidates); 
                
            } catch (error) {
                console.log(error); 
                
            }
        }
    }
    
  return (
    <CandidateContext.Provider
    value={{
        candidates,
        saveCandidate, 
        setEdit,
        candidate, 
        deleteCandidate
    }}
>
    {children}

</CandidateContext.Provider>
  )
}
export{
    CandidateProvider
}

export default CandidateContext;

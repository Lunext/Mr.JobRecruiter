import {createContext, useState, useEffect} from 'react'; 
import axiosClient from '../config/axios';

const CompetenceContext=createContext(); 
const CompetenceProvider=({children})=>{
    const[competences, setCompetences]=useState([]); 
    const[competence,setCompetence]=useState({}); 

    useEffect(()=>{
        const getCompetences=async()=>{
            try{
                const token=localStorage.getItem('token'); 
                if(!token) return ;

                const config={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data}= await axiosClient('/competences',config);
                setCompetences(data); 


            }catch(error){
                console.log(error); 
            }
        }
        getCompetences(); 
    },[]);

    const saveCompetence=async(competence)=>{
        const token= localStorage.getItem('token'); 
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(competence.id){
            try{
                const{data}=await axiosClient.put(`/competences/${competence.id}`, competence,config);
                const updatedCompetence=competences.map(
                    competenceState=>competenceState._id===data._id?data:competenceState);
                    setCompetences(updatedCompetence); 
            }catch(error){
                console.log(error); 
                return false; 
            }
        }else{
            try{
                const{data}=await axiosClient.post('/competences',competence,config);
                const{createdAt,updatedAt,__v,...savedCompetence}=data; 
                setCompetences([savedCompetence,...competences]);
            }catch(error){
                console.log(error.response.data.msg); 
                return false; 
            }
        }
        return true; 

    }
    const setEdit= (competence)=> setCompetence(competence);

    const deleteCompetence=async id=>{
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
                const{data}=await axiosClient.delete(`/competences/${id}`,config);
                const updatedCompetences=competences.filter(
                    competencesState=>competencesState._id!==id);
                setCompetences(updatedCompetences);
            }catch(error){
                console.log(error);
            }
        }
    }

    return(
        <CompetenceContext.Provider
            value={{
                competences,
                saveCompetence,
                setEdit, 
                competence, 
                deleteCompetence
            }}
        >
            {children}
        </CompetenceContext.Provider>
    )
}

export{
    CompetenceProvider
}
export default CompetenceContext;
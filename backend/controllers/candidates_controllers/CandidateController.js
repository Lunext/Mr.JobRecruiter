import {trusted} from 'mongoose'; 
//import { errorMonitor } from 'nodemailer/lib/xoauth2';
import Candidate from '../../models/candidates_models/Candidate.js';

const addCandidate=async(req,res)=>{
    console.log(req.body); 

    const{cedula,name,salary,jobPositions,departments,competences,trainings,jobExperiences,recomendedBy}=req.body; 

    const candidateExist=await Candidate.findOne({cedula}); 

    if(candidateExist){
        const error=new errorMonitor('Este candidato ya está registrado'); 
        return res.status(400).json({msg:error.message}); 
    }
    try {
        const candidate=new Candidate(req.body); 
        const savedCandidate=await candidate.save(); 
        res.json(savedCandidate); 
        console.log(candidate); 
        
    } catch (error) {
        console.log(error); 
    }
}
const getCandidates=async(req,res)=>{
    const candidates=await Candidate.find().populate('jobPosition'); 
    res.json(candidates); 
}
const getCandidate=async(req,res)=>{
    const{id}=req.params; 
    const candidate=await Candidate.findById(id); 
    if(!candidate) return res.status(404).json({msg:'No encontrado'}); 
    res.json(candidate); 
}
const updateCandidate=async(req,res)=>{
    const{id}=req.params; 
    const candidate=await Candidate.findById(id); 
    if(!candidate) return res.status(404).json({msg:'No encontrado'}); 

    candidate.cedula=req.body.cedula||candidate.cedula; 
    candidate.name=req.body.name||candidate.name; 
    candidate.salary=req.body.salary||candidate.salary; 
    candidate.jobPosition=req.body.jobPosition||candidate.jobPosition;
    candidate.departments=req.body.departments||candidate.departments; 
    candidate.competences=req.body.competences||candidate.competences; 
    candidate.trainings=req.body.trainings||candidate.trainings; 
    candidate.jobExperiences=req.body.jobExperiences||candidate.jobExperiences; 
    candidate.recomendedBy=req.body.recomendedBy||candidate.recomendedBy; 
    try{
        const updatedCandidate=await candidate.save(); 
        res.json(updatedCandidate);
    }catch(error){
        console.log(error); 
    }

}
const deleteCandidate=async(req,res)=>{
    const{id}=req.params; 
    const candidate=await Candidate.findById(id); 
    if(!candidate)return res.status(404).json({msg:'No encontrado'}); 

    try{
        await candidate.deleteOne(); 
        res.json({msg:'Candidato borrado correctamente'}); 
    }catch(error){
        console.log(error); 
    }
}
const getAlljobPositions= async(req,res)=>{
     
    const foundCandidate=await Candidate.findOne({ _id:id}).populate({
        path:'jobPositions', populate
    }); 
    console.log(foundCandidate);
    res.json(foundCandidate);
    
}
export{addCandidate,getCandidates,getCandidate,updateCandidate,deleteCandidate,getAlljobPositions};
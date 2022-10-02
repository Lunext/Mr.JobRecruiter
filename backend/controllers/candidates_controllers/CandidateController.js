import {trusted} from 'mongoose'; 
//import { errorMonitor } from 'nodemailer/lib/xoauth2';
import Candidate from '../../models/candidates_models/Candidate.js';
import Employee from '../../models/admin_models/Employee.js';

const addCandidate=async(req,res)=>{
    console.log(req.body); 
    const{cedula,name,salary,jobPosition,department,competences,trainings,jobExperience,recomendedBy,languages}=req.body; 
    const candidateExist=await Candidate.findOne({cedula}); 

    if(candidateExist){
        const error=new Error('Este candidato ya está registrado'); 
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
    const candidates=await Candidate.find()
    .populate('jobPosition')
    .populate('department')
    .populate('competences')
    .populate('trainings')
    .populate('jobExperience')
    .populate('languages');
    
    
    res.json(candidates); 
}
const getCandidate=async(req,res)=>{
    const{id}=req.params; 
    const candidate=await Candidate.findById(id); 
    if(!candidate) return res.status(404).json({msg:'No encontrado'}); 
    res.json(candidate); 
}
const candidateToEmployee=async(req,res)=>{
    const{id}=req.params; 

    const candidate=await Candidate.findById(id); 
   // const employees= Employee.find(); 
   
    const candidates=Candidate.find(); 
    if(!candidate) return res.status(404).json({msg:'No encontrado'}); 
    const employee=new Employee({cedula,name,salary,department,hireDate,jobPosition,isAvailable});

    
        employee.cedula=req.body.cedula||candidate.cedula; 
        employee.name=req.body.name||candidate.name; 
        employee.hireDate=Date.now(); 
        employee.department=req.body.department||candidate.department; 
        employee.jobPosition=req.body.jopPosition||candidate.jobPosition; 
        employee.salary=req.body.salary||candidate.salary; 
        employee.isAvailable=true; 

    try{
        const employeeToCandidate=await employee.save(); 
        res.json(employeeToCandidate);
    }catch(error){
        console.log(error); 
    }

    
}
const updateCandidate=async(req,res)=>{
    const{id}=req.params; 
    const candidate=await Candidate.findById(id); 
    if(!candidate) return res.status(404).json({msg:'No encontrado'}); 

    candidate.cedula=req.body.cedula||candidate.cedula; 
    candidate.name=req.body.name||candidate.name; 
    candidate.salary=req.body.salary||candidate.salary; 
    candidate.jobPosition=req.body.jobPosition||candidate.jobPosition;
    candidate.department=req.body.department||candidate.department; 
    candidate.competences=req.body.competences||candidate.competences; 
    candidate.trainings=req.body.trainings||candidate.trainings; 
    candidate.jobExperience=req.body.jobExperience||candidate.jobExperience; 
    candidate.languages=req.body.languages||candidate.languages;
    candidate.recommendedBy=req.body.recommendedBy||candidate.recommendedBy; 
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
export{addCandidate,getCandidates,getCandidate,updateCandidate,deleteCandidate,getAlljobPositions,candidateToEmployee};
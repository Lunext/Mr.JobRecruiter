import { trusted } from "mongoose";

import JobExperience from "../../models/candidates_models/JobExperience.js";

const addJobExperience=async(req,res)=>{
    console.log(req.body);

    const{company,jobPosition,dateFrom,dateTo,salary}=req.body;

    const jobExperienceExist=await JobExperience.findOne({company}); 
    if(jobExperienceExist){
        const error=new Error('Esta experiencia laboral ya existe'); 
        return res.status(400).json({msg:error.message});
    }
    try {
        const jobExperience=new JobExperience(req.body); 
        const savedJobExperience=await jobExperience.save(); 
        res.json(savedJobExperience); 
        console.log(jobExperience); 
        
    } catch (error) {
        console.log(error);   
    }
    
}
const getJobExperiences=async(req,res)=>{
    
    const jobExperiences=await JobExperience.find();
    res.json(jobExperiences);
    
    

}
const getJobExperience=async(req,res)=>{
    const{id}=req.params; 
    const jobExperience= await JobExperience.findById(id); 
    if(!jobExperience) return res.status(404).json({msg:'No encotrada'}); 
    res.json(jobExperience); 

}
const updateJobExperience=async(req,res)=>{
    const{id}=req.params; 
    const jobExperience=await JobExperience.findById(id); 
    if(!jobExperience) return res.status(404).json({msg:'No encontrado'});

    jobExperience.company=req.body.company||jobExperience.company; 
    jobExperience.jobPosition=req.body.jobPosition||jobExperience.jobPosition; 
    jobExperience.dateFrom=req.body.dateFrom|| jobExperience.dateFrom; 
    jobExperience.dateTo=req.body.dateTo|| jobExperience.dateTo; 
    jobExperience.salary=req.body.salary|| jobExperience.salary; 

    try{
        const updatedJobExperience=await jobExperience.save(); 
        res.json(updatedJobExperience); 
    }catch(error){
        console.log(error); 
    }
}
//Get all the job positions from the foreign key

const deleteJobExperience=async(req,res)=>{
    const{id}= req.params; 
    const jobExperience=await JobExperience.findById(id); 
    if(!jobExperience)return res.status(404).json({msg:'No encontrado'});

    try {
        await jobExperience.deleteOne(); 
        res.json({msg:'Experiencia laboral eliminada'})
    } catch (error) {
        console.log(error); 
    }
}

export{addJobExperience,getJobExperience,getJobExperiences, updateJobExperience, deleteJobExperience};
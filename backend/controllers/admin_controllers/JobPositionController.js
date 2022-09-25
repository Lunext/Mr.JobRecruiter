import { trusted } from "mongoose";

import JobPosition from "../../models/admin_models/JobPosition.js";

const addJobPosition=async(req,res)=>{
    console.log(req.body); 
    const{name,riskLevel,minSalary,maxSalary,isAvailable}=req.body; 

    const jobPositionExist=await JobPosition.findOne({name}); 
    if(jobPositionExist){
        const error=new Error('Posición de trabajo ya registrada!'); 
        return res.status(400).json({msg:error.message}); 
    }try{
         const jobPosition=new JobPosition(req.body); 
         const savedJobPosition=await jobPosition.save(); 
         res.json(savedJobPosition); 
         console.log(jobPosition); 
        
    }catch(error){
        console.log(error); 
    }
}
const getJobPositions=async(req,res)=>{
    const jobPositions=await JobPosition.find(); 
    res.json(jobPositions); 
};
const getJobPosition=async(req,res)=>{
    const{id}=req.params;
    const jobPosition=await JobPosition.findById(id); 

    if(!jobPosition) return res.status(404).json({msg:'No encontrado'}); 
    res.json(jobPosition); 
}
const updateJobPosition=async(req,res)=>{
    const{id}=req.params; 
    const jobPosition=await JobPosition.findById(id); 
    if(!jobPosition)return res.status(404).json({msg:'No encontrado'});

    jobPosition.name=req.body.name||jobPosition.name; 
    jobPosition.riskLevel=req.body.riskLevel||jobPosition.riskLevel; 
    jobPosition.minSalary=req.body.minSalary||jobPosition.minSalary; 
    jobPosition.maxSalary=req.body.maxSalary||jobPosition.maxSalary;
    jobPosition.isAvailable= req.body.isAvailable||jobPosition.isAvailable; 

    try{
        const updatedJobPosition=await jobPosition.save(); 
        res.json(updatedJobPosition); 
    }catch(error){
        console.log(error);
    }

}

const deleteJobPosition=async(req,res)=>{
    const{id}=req.params; 
    const jobPosition=await JobPosition.findById(id);
    if(!jobPosition) return res.status(404).json({msg:'No encontrado'}); 

    try{
        await jobPosition.deleteOne(); 
        res.json({msg:'Posición laboral elimnada'})
    }catch(error){
        console.log(error); 
    }
}
export{addJobPosition, getJobPosition, getJobPositions, updateJobPosition, deleteJobPosition};
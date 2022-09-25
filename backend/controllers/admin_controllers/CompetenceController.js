import { trusted } from "mongoose";
import Competence from "../../models/admin_models/Competence.js";
import Language from "../../models/admin_models/Language.js";

const addCompetence=async(req,res)=>{
    console.log(req.body); 

    const{description,isAvailable}=req.body; 

    const competenceExist=await Competence.findOne({description}); 
    if(competenceExist){
        const error=new Error('Competencia ya registrada!'); 
        return res.status(400).json({msg:error.message});
    }
    try{
        const competence=new Competence(req.body); 
        const savedCompetence=await competence.save(); 
        res.json(savedCompetence); 
        console.log(competence); 

    }catch(error){
        console.log(error); 

    }
}
const getCompetences=async(req,res)=>{
    const competences=await Competence.find();
    res.json(competences); 
};
const getCompetence=async(req,res)=>{
    const{id}=req.params; 
    const competence=await Competence.findById(id);

    if(!competence) return res.status(404).json({msg:'No encontrado'});

    res.json(competence); 
}

const updateCompetence=async(req,res)=>{
    const{id}=req.params; 
    const competence=await Competence.findById(id); 
    if(!competence) return res.status(404).json({msg:'No encontrado'});
    competence.description=req.body.description||competence.description;

    competence.isAvailable=req.body.isAvailable || competence.isAvailable; 
    
    try {
        const updatedCompetence= await competence.save(); 
        res.json(updatedCompetence); 
        
    } catch (error) {
        console.log(error); 
    }
}

const deleteCompetence=async(req,res)=>{
    const{id}=req.params; 
    const competence=await Competence.findById(id); 
    if(!competence)return res.status(404).json({msg:'No encontrado'});

    try{
        await competence.deleteOne(); 
        res.json({msg:'Competencia eliminada'});
    }catch(error){
        console.log(error);
    }
}

export{addCompetence,getCompetence,getCompetences, updateCompetence, deleteCompetence};

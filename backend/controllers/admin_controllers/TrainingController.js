import { trusted } from "mongoose";
import Training from "../../models/admin_models/Training.js";

const addTraining=async(req,res)=>{
    console.log(req.body); 

    const{description,level,dateFrom,dateTo,institution}=req.body; 

    const trainingExist=await Training.findOne({description}); 
    if(trainingExist){
        const error=new Error('Esta capacitación ya está registrada!');
        return res.status(400).json({msg:error.message}); 
    }try{
        const training=new Training(req.body); 
        const savedTraining=await training.save();  
        res.json(savedTraining); 
        console.log(training); 

    }catch(error){
        console.log(error); 
    }
}
const getTrainings=async(req,res)=>{
    const trainings=await Training.find(); 
    res.json(trainings); 
}
const getTraining=async(req,res)=>{
    const{id}=req.params; 
    const training=await Training.findById(id); 
    if(!training) return res.status(404).json({msg:'No encontrado'}); 
    res.json(training); 
}
const updateTraining=async(req,res)=>{
    const{id}=req.params; 
    const training=await Training.findById(id);
    if(!training)return res.status(404).json({msg:'No encontrado'}); 

    training.descritpion=req.body.descritpion||training.descritpion; 
    training.level=req.body.level||training.level; 
    training.dateFrom=req.body.dateFrom||training.dateFrom; 
    training.dateTo=req.body.dateTo||training.dateTo; 
    training.institution=req.body.institution||training.institution; 

    try{
        const updatedTraining=await training.save();
        res.json(updatedTraining); 
    }catch(error){
        console.log(error); 
    }
}

const deleteTraining=async(req,res)=>{
    const{id}=req.params; 
    const training=await Training.findById(id); 
    if(!training) return res.status(404).json({msg:'No encontrado'}); 

    try{
        await training.deleteOne(); 
        res.json({msg:'Capacitacion eliminada'});
    }catch(error){
        console.log(error); 
    }
}
export{addTraining,getTraining,getTrainings,updateTraining,deleteTraining};
import {trusted} from 'mongoose'; 
import Language from '../../models/admin_models/Language.js';

const addLanguage=async(req,res)=>{
    console.log(req.body);
   
    const{name, isAvailable}=req.body; 
    //Prevent if an user is registered 
    const languageExist= await Language.findOne({name}); 
    if(languageExist){
        const error= new Error('Lenguaje ya registrado!'); 
        return res.status(400).json({msg:error.message}); 
    }
    try{
        const language=new Language(req.body); 
        
        //language.user=req.user._id; 
        const savedLanguage= await language.save(); 
        res.json(savedLanguage); 
        console.log(language); 
    }
    catch(error){
        console.log(error); 
    }
}
const getLanguages=async(req,res)=>{
    const languages=await Language.find();
    // .where('name').equals(req.user); 

    res.json(languages);
};
const getLanguage=async(req,res)=>{
    const{id}=req.params; 
    const language=await Language.findById(id); 
    
    if(!language){
        return res.status(404).json({msg:'No encontrado'});
    }
  //  if(language.user._id.toString()!==req.user._id.toString()){
  //      return res.json({msg:"Accion no valida"});
  //  }
        res.json(language); 
}
const updateLanguage=async(req,res)=>{
    const{id}=req.params; 
    const language=await Language.findById(id); 
    if(!language){
        return res.status(404).json({msg:'No encontrado'}); 
    }
  //  if(language.user._id.toString()!==req.user._id.toString()){
  //      return res.json({msg:'Accion no valida'});
  //  }

    // Update language 
    language.name=req.body.name||language.name; 
    language.isAvailable=req.body.isAvailable ||language.isAvailable; 
    
    try{
        const updatedLanguage=await language.save(); 
        res.json(updatedLanguage); 
    }catch(error){
        console.log(error); 
    }
}
const deleteLanguage=async(req,res)=>{
    const{id}=req.params; 
    const language=await Language.findById(id); 
    if(!language){
        return res.status(404).json({msg:'No encontrado'}); 
    }
  //  if(language.user._id.toString()!==req.user._id.toString()){
  //      return res.json({msg:'Accion no valida'}); 
  //  }
    try {
        await language.deleteOne(); 
        res.json({msg:'Lenguaje eliminado'}); 
        
    } catch (error) {
        console.log(error); 
        
    }
}
export{addLanguage,getLanguages,getLanguage, updateLanguage, deleteLanguage};

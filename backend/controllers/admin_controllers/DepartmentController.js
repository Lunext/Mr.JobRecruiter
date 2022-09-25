import { trusted } from "mongoose";
import Department from "../../models/admin_models/Department.js";

const addDepartment=async(req,res)=>{
    console.log(req.body); 
    const{name,isAvailable}=req.body; 
    
    const departmentExist=await Department.findOne({name}); 
    if(departmentExist){
        const error=new Error('Departamento ya registrado!'); 
        return res.status(400).json({msg:error.message}); 
    }
    try{
        const department=new Department(req.body); 
        const savedDepartment= await department.save(); 
        res.json(savedDepartment); 
        console.log(department); 
    }
    catch(error){
        console.log(error); 
    }
}
const getDepartments=async(req,res)=>{
    const departments=await Department.find(); 
    res.json(departments); 
};
const getDepartment=async(req,res)=>{
    const{id}=req.params; 
    const department=await Department.findById(id); 

    if(!department)  return res.status(404).json({msg:'No encontrado'});
    res.json(department);
}

const updateDepartment=async(req,res)=>{
    const{id}=req.params;
    const department=await Department.findById(id); 
    if(!department)  return res.status(404).json({msg:'No encontrado'});

    department.name=req.body.name||department.name;
    department.isAvailable=req.body.isAvailable||department.isAvailable;

    try{
        const updatedDepartment= await department.save(); 
        res.json(updatedDepartment); 
    }catch(error){
        console.log(error); 
    }
}
const deleteDepartment=async(
    req,res)=>{
    const{id}=req.params; 
    const department=await Department.findById(id); 
    if(!department)return res.status(404).json({msg:'No encontrado'}); 

    try{
        await department.deleteOne(); 
        res.json({msg:'Lenguaje eliminado'}); 
    }catch(error){
        console.log(error); 
    }    
}
export{addDepartment,getDepartments, getDepartment, updateDepartment, deleteDepartment}; 
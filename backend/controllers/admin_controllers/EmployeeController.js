import {trusted} from 'mongoose'; 

import Employee from '../../models/admin_models/Employee.js';
 import Candidate from '../../models/candidates_models/Candidate.js';

const addEmployee=async(req,res)=>{
    console.log(req.body); 
    

    const{cedula,name,salary,jobPostion,department,hireDate,isAvailable}=req.body; 

    //const candidateExist=await Candidate.findOne({cedula}); 
    const employeeExist=await Employee.findOne({cedula}); 

    if(employeeExist){
        const error=new Error('Este empleado ya está registrado ');
        return res.status(400).json({msg:error.message}); 
    }
    try{
        
        const employee=new Employee(req.body); 
        const savedEmployee=await employee.save(); 
        
       
            res.json(savedEmployee); 
            

    
       
        console.log(employee);
    }catch(error){
        console.log(error); 
    }
}
const getEmployees=async(req,res)=>{
    const employees=await Employee.find()
    .populate('jobPosition')
    .populate('department'); 
    res.json(employees); 
}
const getEmployee=async(req,res)=>{
    const{id}=req.params; 
    const employee=await Employee.findById(id); 
    if(!employee) return res.status(404).json({msg:'No encontrado'}); 
    res.json(employee); 
}
const updateEmployee=async(req,res)=>{
    const{id}=req.params; 
    const employee= await Employee.findById(id); 
    if(!employee) return res.status(404).json({msg:'No encontrado'});
    employee.cedula=req.body.cedula||employee.cedula; 
    employee.name=req.body.name||employee.name; 
    employee.salary=req.body.salary||employee.salary; 
    employee.jobPostion=req.body.jobPostion||employee.jobPostion; 
    employee.department=req.body.department||employee.department; 
    employee.hireDate=req.body.hireDate||employee.hireDate; 
    employee.isAvailable=req.body.isAvailable||employee.isAvailable; 

    try {
        const updatedEmployee=await employee.save(); 
        res.json(updatedEmployee); 
    } catch (error) {
        console.log(error);
    }
}
const deleteEmployee=async(req,res)=>{
    const{id}=req.params; 
    const employee=await Employee.findById(id); 
    if(!employee) return res.status(404).json({msg:'No encontrado'}); 

    try {
        await employee.deleteOne(); 
        res.json({msg:'Empleado borrado correctamente'})
        
    } catch (error) {
        console.log(error);
        
    }
}
export{addEmployee,getEmployee,getEmployees,updateEmployee,deleteEmployee}; 
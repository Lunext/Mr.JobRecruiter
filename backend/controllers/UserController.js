import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import emailForgotPassword from "../helpers/emailForgotPassword.js";
import emailRegister from "../helpers/emailRegister.js";

const register= async(req,res)=>{
    console.log(req.body); 
    //Destructuring email and name; 

    const{email,name, roles, password}=req.body; 
    if(!email||!password || !Array.isArray(roles)||!roles.length){
        return res.status(400).json({message:"Todos los campos son obligatorios"})
    }

    //Prevent if an user is registered 
    const userExist= await User.findOne({email}); 
    if(userExist){
        const error= new Error('Usuario ya registrado!'); 
        return res.status(400).json({msg:error.message}); 
    }
    try {
        const user=new User(req.body); 
        const userSaved=await user.save(); 

        //Send email 
        emailRegister({
            email, 
            name,
            roles, 
            token:userSaved.token
        })

        res.json(userSaved); 
        
    } catch (error) {
        console.log(error); 
    }
}

const profile=(req,res)=>{
    console.log(req.user);
    const{user}=req; 
    res.json(user); 
}
const confirm= async(req,res)=>{
    const{token}=req.params; 
   const confirmUser= await User.findOne({token}); 
   console.log(token);
   if(!confirmUser){
    const error=new Error('Token no valido'); 
    return res.status(404).json({msg:error.message}); 
   }
   try{
     confirmUser.token=null; 
     confirmUser.confirm=true; 
     await confirmUser.save(); 
     res.json({msg:'Usuario confirmado correctamente'}); 

   }catch(error){
    console.log(error); 
   }
   
}
const authenticate=async(req,res)=>{
    const{email,password}=req.body;

    //User exist? 
    const user= await User.findOne({email}); 
    if(!user){
        const error=new Error('Usuario no existe'); 
        return res.status(400).json({msg:error.message});
    }
    //Confirm if user is confirmmed 
    if(!user.confirm){
        const error= new Error('Tu cuenta no sido confirmada'); 
        return res.status(403).json({msg:error.message}); 
    }
    //Check password 
    if(await user.checkPassword(password)){
        console.log(user); 
        
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateJWT(user.id)
        });
    }else{
        const error=new Error('Contraseña incorrecta'); 
        return res.status(403).json({msg:error.message});
    }
}
const forgotPassword=async(req,res)=>{
    const{email}=req.body; 
    const userExist= await User.findOne({email});
    if(!userExist){
        const error=new Error('El usuario no existe'); 
        return res.status(400).json({msg:error.message}); 
    }
    try{
        userExist.token=generateId();
        await userExist.save(); 
        //Send email with instructions
        emailForgotPassword({
            email, 
            name:userExist.name, 
            token:userExist.token, 
        })
       
        
        res.json({msg:"Hemos enviado email con las instrucciones de lugar"});
    }catch(error){
        console.log(error); 
    }
}

const checkToken=async (req,res)=>{
    const {token}=req.params; 
    const validToken=User.findOne({token}); 

    if(validToken){
        res.json({msg:'Token valido y el usuario existe'}); 
    }else{
        const error=new Error('Token no valido!'); 
        return res.status(400).json({msg:error.message}); 
    }
    console.log(token);
}
const newPassword=async (req,res)=>{
    const{token}=req.params; 
    const{password}=req.body; 
    const user=await User.findOne({token}); 
    if(!user){
        const error=new Error('Hubo un error');
        return res.status(400).json({msg:error.message}); 
    }
    try{
        user.token=null; 
        user.password=password; 
        await user.save(); 
        res.json({msg:"Contraseña modificada correctamente"});
        console.log(user);
    }catch(error){
        console.log(error); 
    }
}

export{
    register,
    profile,
    confirm, 
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
};
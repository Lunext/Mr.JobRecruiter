import express from "express";
import dotenv from 'dotenv'; 
import cors from 'cors';
import connectDB from "./config/db.js";
import usersRoutes from'./routes/usersRoutes.js'; 
import competencesRoute from './routes/admin_routes/competencesRoute.js';
import languagesRoute from './routes/admin_routes/languagesRoute.js'
import departmentsRoutes from './routes/admin_routes/departmentsRoutes.js'; 
import jobPositionsRoute from './routes/admin_routes/jobPositionsRoute.js'; 
import  trainingRoute from './routes/admin_routes/trainingRoute.js'
import jobExperienceRoute from './routes/candidate_routes/jobExperienceRoute.js'; 
import candidatesRoute from './routes/candidate_routes/candidatesRoute.js'
import employeeRoute from './routes/admin_routes/employeeRoute.js'
//Creating the server
const app= express(); 
//For postman
app.use(express.json()); 

dotenv.config(); 
connectDB();

//Cors
const dominiosPermitidos=[process.env.FRONTEND_URL];
const corsOptions={
    origin:function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !==-1){
            //El origen del request esta permitido 
            callback(null,true); 
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions));

//Routes 
app.use('/api/users', usersRoutes);
app.use('/api/languages',languagesRoute); 
app.use('/api/competences',competencesRoute);
app.use('/api/departments', departmentsRoutes);
app.use('/api/jobPositions', jobPositionsRoute);
app.use('/api/trainings', trainingRoute);  
app.use('/api/jobExperiences', jobExperienceRoute);
app.use('/api/candidates',candidatesRoute); 
app.use('/api/employees',employeeRoute);

const PORT=process.env.PORT || 4000; 
app.listen(PORT,()=>{
    console.log(`The server is working on the port ${PORT}`);
})


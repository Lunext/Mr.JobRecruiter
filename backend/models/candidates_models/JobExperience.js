import mongoose, { Schema } from "mongoose";
const jobExperienceSchema=mongoose.Schema({
    company:{
        type:String, 
        require:true, 
    }, 
    jobPosition:{
        type:String,
        require:true,
    },
    dateFrom:{
        type:Date,
        require:true, 
        default:Date.now()
    }, 
    dateTo:{
        type:Date, 
        required:true,
        default:Date.now()
    }, 
    salary:{
        type:Number, 
        require:true,
    }
},{
    timestamps:true,
});
const JobExperience=
mongoose.model('JobExperience',jobExperienceSchema); 
export default JobExperience;

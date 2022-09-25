import mongoose from 'mongoose'; 

const languageSchema=mongoose.Schema({
    name:{
        type:String, 
        required:true,
        
    },
    isAvailable:{
        type: Boolean, 
        default:false, 
    }, 
    
},{
    timestamps:true, 
});

const Language=mongoose.model('Language', languageSchema); 
export default Language; 
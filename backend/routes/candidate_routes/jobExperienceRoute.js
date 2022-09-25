import express from 'express'; 

import { addJobExperience, getJobExperience,getJobExperiences,updateJobExperience,deleteJobExperience} from '../../controllers/candidates_controllers/JobExperienceController.js';
import { checkAuth } from '../../middlewares/authMiddleware.js';

const router=express.Router(); 
router.route('/')
.post(checkAuth,addJobExperience)
.get(checkAuth,getJobExperiences)



router
.route('/:id')
.get(checkAuth,getJobExperience)
.put(checkAuth,updateJobExperience)
.delete(checkAuth,deleteJobExperience); 

export default router;
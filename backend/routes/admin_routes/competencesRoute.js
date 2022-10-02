import express from 'express'; 
import {addCompetence,getCompetence,
    getCompetences,updateCompetence,deleteCompetence} from '../../controllers/admin_controllers/CompetenceController.js'; 
import { checkAuth, checkRole } from '../../middlewares/authMiddleware.js';

const router=express.Router(); 
router.route('/')
.post(checkAuth,addCompetence)
.get(checkAuth,getCompetences); 

router
.route('/:id')
.get(checkAuth,getCompetence)
.put(checkAuth,updateCompetence)
.delete(checkAuth,deleteCompetence);

export default router; 

import express from 'express'; 

import { addCandidate,getAlljobPositions,getCandidate,getCandidates,updateCandidate,deleteCandidate } from '../../controllers/candidates_controllers/CandidateController.js';
import { checkAuth } from '../../middlewares/authMiddleware.js';

const router=express.Router(); 
router.route('/')
.post(checkAuth,addCandidate)
.get(checkAuth,getCandidates)

// router.route('/:id/jobPositions')
// .get(checkAuth,getAlljobPositions);

router.route('/:id')
.get(checkAuth,getCandidate)
.put(checkAuth,updateCandidate)
.delete(checkAuth,deleteCandidate)

export default router;
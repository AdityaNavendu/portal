import express from 'express';
import { postjob, getalljobs, getjobbyid, getadminjobs } from '../controllers/jobcontroller.js';
import { isAuth } from '../middleware/isauthn.js';
const router = express.Router();

router.route('/postjob').post(isAuth, postjob);
router.route('/getalljobs').get(getalljobs);
router.route('/getjobbyid/:id').get(getjobbyid);
router.route('/getadminjobs').get(isAuth, getadminjobs);


export default router;

/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import express from 'express';
import { postjob, getalljobs, getjobbyid, getadminjobs } from '../controllers/jobcontroller.js';
import { isAuth } from '../middleware/isauthn.js';
const router = express.Router();

router.route('/postjob').post(isAuth, postjob);
router.route('/getalljobs').get(getalljobs);
router.route('/getjobbyid/:id').get(getjobbyid);
router.route('/getadminjobs').get(isAuth, getadminjobs);


export default router;

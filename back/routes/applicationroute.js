import express from 'express';
import { applyjob, getappliedjobs, getapplicants, updateapplicationstatus } from '../controllers/applicationcontroller.js';
import { isAuth } from '../middleware/isauthn.js';
const router = express.Router();

router.route('/apply/:id').post(isAuth, applyjob);
router.route('/get').get(isAuth, getappliedjobs);
router.route('/:id/applicants').get(isAuth, getapplicants);
router.route('/status/:id/update').post(isAuth, updateapplicationstatus);

export default router;
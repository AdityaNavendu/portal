/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import express from 'express';
import { getallCompanies,getCompanyByid,registerCompany,updateCompany } from '../controllers/companycontroller.js';
import { isAuth } from '../middleware/isauthn.js';
import {upload } from '../middleware/multer.js';
const router = express.Router();

router.route('/register').post(isAuth, registerCompany);
router.route('/getall').get(isAuth, getallCompanies);
router.route('/get/:id').get(isAuth, getCompanyByid);
router.route('/update/:id').put(isAuth,upload, updateCompany);


export default router;
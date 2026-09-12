import express from 'express';

import { logout, register, updateProfile } from '../controllers/usercontrollers.js';
import { login, } from '../controllers/usercontrollers.js';
import { isAuth } from '../middleware/isauthn.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.route('/register').post(upload,register)
router.route('/login').post(login)
router.route('/update/profile').post(isAuth,upload, updateProfile);

router.route('/logout').get(isAuth, logout)

export default router;
import express from "express";
import cookieParser from "cookie-parser";
import { protectadmin } from '../middileware/adminMiddileware.js'
import { adminLogin, logout, addUser, allUser, getUser, editUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

router.use(cookieParser());


router.get('/all', allUser)
router.get('/:id', protectadmin, getUser)

router.put('/:id', editUser)
router.delete('/:id', deleteUser)
router.post('/add', addUser)


router.post('/adminlogin', adminLogin)
router.post('/logout', logout)




export default router
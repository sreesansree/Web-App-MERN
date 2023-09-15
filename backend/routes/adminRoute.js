import  express  from "express";
import cookieParser from "cookie-parser";
import protectadmin from '../middileware/adminMiddileware.js'

const router = express.Router();

router.use(cookieParser());


export default router
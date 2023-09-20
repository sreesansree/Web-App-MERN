import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'



const protectadmin = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.admintoken;
    console.log(token, "tokennnn");


    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await Admin.findById(decode.adminId).select('-password');
            next()

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized,invalid token')
        }

    } else {
        res.status(401);
        throw new Error('Not authorizes , no token')
    }
})






export  { protectadmin }
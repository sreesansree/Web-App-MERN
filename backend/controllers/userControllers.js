import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
import Admin from '../models/adminModel.js'
import cloudinary from 'cloudinary'
import bcryptjs from 'bcryptjs';


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && await bcryptjs.compare(password, user.password)) {
        generateToken(res, user._id)
        res.status(201).json({
            message: "LOgeed in Suceessfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            profileimage: user.profileimage

        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

});


//     Register a new user
//    POST /api/users

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


//     Logout user / clear cookie
//    POST /api/users/logout

const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User Logged Out' });
});



//     Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

//     Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(user, 'useerrrr')
        if (req.body.profileimage) {
            const image = req.body.profileimage
            const uploadResponse = await cloudinary.v2.uploader.upload(image)
            user.profileimage = uploadResponse.url;
        }
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save();
            
        return   res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profileimage: updatedUser.profileimage
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }

        // res.status(200).json({ message: "update user prifle user" })
    } catch (error) {
        console.log(error.message)

    }

});

const adminLogin = asyncHandler(async (req, res) => {
    console.log(req.body, 'Request body');
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            if (password = admin.password) {
                generateToken(res, admin.email)
                res.status(200).json({ message: 'hakjhhs' })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
    // adminLogin
}
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'





const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User' });
});


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Register User' });
});



const logOutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout User' });
});


const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Profile' });
});


const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User' });
});

export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile
}
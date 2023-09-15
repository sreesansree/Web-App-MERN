import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Admin from '../models/adminModel.js'
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
import generateadminToken from '../utils/generateToken.js';
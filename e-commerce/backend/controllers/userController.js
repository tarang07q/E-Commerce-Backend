const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const registerUser = async (req,res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error Creating the User',error});
    }
};

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}) 
        if(!user) {
            return res.status(404).json({message: 'User does not exist'});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message : 'Invalid Password'});
        }

        const token = jwt.sign({id:user._id,isAdmin: user.isAdmin},process.env.JWT_SECRET , {
            expiresIn: '30d',
        });

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: 'Could not process the Login '});
    }
};

const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: 'Error updating the User Profile' ,error});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
}
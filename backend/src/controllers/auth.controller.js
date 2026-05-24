const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")  
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")    


/**
 * @name registerUserController
 * @description register a new user,expect name,email,password in the request body
 * @access public
 */
async function registerUserController(req,res){
    const {username,email,password} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({message:"All fields are required"})
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" })
    }
    const hash= await bcrypt.hash(password,10)
    try {
        const User = await userModel.create({
            username,
            email,
            password:hash
        })
        const token=   jwt.sign(
            {id:User._id,username: User.username},process.env.JWT_SECRET,{expiresIn:"1d"}
        ) 
        
        res.cookie("token", token, { 
            httpOnly: true, 
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production" 
        })
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:User._id,
                username:User.username,
                email:User.email
            }  
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: Object.values(error.errors).map(val => val.message)[0] })
        }
        res.status(500).json({ message: error.message })
    }
}

/**
 * @name loginUserController
 * @description login a user,expect email,password in the request body
 * @access public       
 */
async function loginUserController(req,res){
    const {email,password} = req.body 
    
    const user =await userModel.findOne({email})
    if (!user) {
        return res.status(400).json({message:"User not found"})
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if (!isPasswordValid) {
        return res.status(400).json({message:"Invalid password"})
    }
    const token=   jwt.sign(
        {id:user._id,username: user.username},process.env.JWT_SECRET,{expiresIn:"1d"}
    ) 
    res.cookie("token", token, { 
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" 
    })
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name getMeController
 * @description get the details of the logged in user
 * @access private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description logout a user by clearing the token cookie
 * @access public       
 */
async function logoutUserController(req,res){
    const token = req.cookies?.token
    if (token) {
        await tokenBlacklistModel.create({token}).catch(() => {}); 
    }
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully"})
}

module.exports = {registerUserController, loginUserController, logoutUserController, getMeController}

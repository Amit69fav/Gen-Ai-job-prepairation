const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:true,
    },

    email:{
        type:String,
        unique:[true,"Email already exist with another account"],
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type:String,
        required:true,
        minlength: [8, "Password must be at least 8 characters long"]
    }
})

const userModel = mongoose.model("users",userSchema)
module.exports=userModel

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success:false,message:"User dosen't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }

        const token = createToken(user._id);
        return res.json({success:true,token,_id:user._id})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error logging in"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success:false,message:"User already exists"})
        }

        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        if (password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }

        const salt = await bcrypt.genSalt(10)
        console.log(salt)
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log(hashedPassword)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        console.log(newUser)

        const user  = await newUser.save()
        console.log(user)
        const token = createToken(user._id)
        console.log(token)
        res.json({success:true,token,_id:user._id});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in token"})
    }
}

export {loginUser,registerUser}
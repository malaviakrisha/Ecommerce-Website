import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://malaviakrisha:8591065292@cluster0.e7qu4.mongodb.net/quirklay-website').then(()=>console.log("DB connected"));
}
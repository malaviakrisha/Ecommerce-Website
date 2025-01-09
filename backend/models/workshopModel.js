import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    payment:{type:Boolean,default:false}
})

const workshopModel = mongoose.models.workshop || mongoose.model("workshop",workshopSchema);

export default workshopModel;
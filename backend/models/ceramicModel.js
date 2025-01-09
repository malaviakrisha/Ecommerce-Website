 import mongoose from "mongoose";

 const ceramicSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    new_price:{type:Number,default:null},
    image:{type:String,required:true},
    category:{type:String,required:true},
    best_seller:{type:Boolean,default:false},
    popular_products:{type:Boolean,default:false},
    sale_list:{type:Boolean,default:false}
 })

 const ceramicModel = mongoose.models.ceramic || mongoose.model("ceramic",ceramicSchema);

 export default ceramicModel;
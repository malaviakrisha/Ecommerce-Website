import ceramicModel from "../models/ceramicModel.js";
import fs from 'fs';

//add ceramic items
const addCeramic= async(req,res)=>{
    
    let image_filename= `${req.file.filename}`;

    const ceramic = new ceramicModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        new_price:req.body.new_price,
        category:req.body.category,
        image: image_filename,
        best_seller: req.body.best_seller,
        popular_products: req.body.popular_products,
        sale_list: req.body.sale_list
    })
    console.log("ceramica",ceramic)

    try{
        await ceramic.save();
        res.json({success:true,message:"ceramic added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error adding ceramic"})
    }
}

//all ceramic list
const listCeramic= async(req,res)=>{
    try {
        const ceramics= await ceramicModel.find({});
        res.json({success:true,data:ceramics})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in list"})
    }
}

//remove ceramic item
const removeCeramic= async(req,res)=>{
    try {
        
        const ceramic = await ceramicModel.findById(req.body.id)
        fs.unlink(`uploads/${ceramic.image}`,()=>{})

        await ceramicModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"ceramic removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in removing data"})
    }
}

export {addCeramic,listCeramic,removeCeramic}
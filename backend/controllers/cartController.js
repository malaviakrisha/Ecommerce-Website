import userModel from '../models/userModel.js'

const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error adding data to cart"})
    }
}

const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        else{
            res.json({success:false,message:"Item not found in cart"})
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"item removed from the cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error removing the item from the cart"})
    }
}

const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"issue in fetching the cart data"})
    }
}

export {addToCart,removeFromCart,getCart}
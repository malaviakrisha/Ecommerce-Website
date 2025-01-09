import userModel from "../models/userModel.js";
import workshopModel from "../models/workshopModel.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const workshopRegister = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    
        // Save the workshop registration details
        const newRegister = new workshopModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newRegister.save();
        await userModel.findByIdAndUpdate(req.body.userId, { registerData: {} });


        // Calculate the total amount in paise (Razorpay expects the amount in paise)
        const numPeople = req.body.items;  // This is the number of people, not an array
        const totalCost = req.body.amount; // Assuming the total cost is passed correctly

        // Calculate the total amount for Razorpay (in paise, i.e., multiply by 100)
        let totalAmount = numPeople * totalCost * 100;

        // Create an order in Razorpay
        const options = {
            amount: totalAmount, // amount in paise
            currency: "INR",
            receipt: `receipt_order_${newRegister._id}`,
            payment_capture: 1 // auto capture after payment
        };

        const order = await razorpay.orders.create(options);

        // Send the order ID to the frontend to complete the payment
        res.json({
            success: true,
            razorpayKey: process.env.RAZORPAY_KEY_ID,
            orderId: order.id,
            amount: totalAmount,
            message: "Registered successfully",
            session_url: `${frontend_url}/verify?success=true&orderId=${newRegister._id}` // Frontend URL after success
        });

};

const listRegisters = async (req, res) => {
    try {
        const registers = await workshopModel.find({});
        res.json({ success: true, data: registers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in fetching registrations" });
    }
};

export { workshopRegister, listRegisters };

import orderModel from "../models/orderModel.js"; 
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();  

import Razorpay from 'razorpay';
import jwt from 'jsonwebtoken'; 

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
console.log("Razorpay Key ID: ", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret: ", process.env.RAZORPAY_KEY_SECRET);


const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.body.userId = decoded.id; 
        console.log("Token: ", token);
        console.log("Decoded Token: ", decoded);

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        let totalAmount = req.body.items.reduce((acc, item) => {
            return acc + (item.price * item.quantity * 100); 
        }, 0);

        const deliveryCharges = 10 * 100;
        totalAmount += deliveryCharges;

        const options = {
            amount: totalAmount, 
            currency: "INR",
            receipt: `receipt_order_${newOrder._id}`
        };
        console.log('op',options)

        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create(options);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            return res.status(500).json({ success: false, message: "Error creating payment order with Razorpay." });
        }

        console.log("razorpayOrder", razorpayOrder);
        
        res.json({
            success: true,
            razorpayKey: process.env.RAZORPAY_KEY_ID,
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: newOrder._id,
            frontend_url: `${frontend_url}/verify?orderId=${newOrder._id}`
        });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ success: false, message: "Error in placing order", error: error.message });
    }
};

const verifyOrder = async (req, res) => {
    const { userId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest('hex');
    if (generated_signature === razorpaySignature) {
        await orderModel.findByIdAndUpdate(userId, { payment: true });
        res.json({ success: true, message: "Payment verified and order paid" });
    } else {
        await orderModel.findByIdAndDelete(userId);
        res.json({ success: false, message: "Payment verification failed" });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating order status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

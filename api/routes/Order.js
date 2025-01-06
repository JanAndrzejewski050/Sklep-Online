const express = require("express");
const protect = require("../middleware/Auth");
const orderRoute = express.Router();
const AsyncHandler = require("express-async-handler");

orderRoute.post("/", protect, AsyncHandler(
    async (req, res) => {
        const {
            orderItems,
            shippingAdress,
            paymentMethods, shippingPrice,
            taxPrice,
            totalPrice,
            price 
        } = req.body;

        if(orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error ('No order items found');

        } else {
            const order = new Order( {
                orderItems,
            shippingAdress,
            paymentMethods, shippingPrice,
            taxPrice,
            totalPrice,
            price,
            user: req.user._id
            })

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    }
));

module.exports = orderRoute;
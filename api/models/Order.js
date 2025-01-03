const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({
    name: { type: String , required: true},
    quantity: { type: Number , required: true},
    image: { type: String , required: true},
    price: { type: Number , required: true},
    product: { 
        type:  mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: true},
})

const orderSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        orderItems: [orderItemSchema],
        shippingAdress: {
            address: { type: String, required: true},
            city: { type: String , required: true},
            postalCode: { type: String , required: true},
            country: { type: String , required: true},
        },

    }
);

module.exports = mongoose.model("Order", orderSchema);

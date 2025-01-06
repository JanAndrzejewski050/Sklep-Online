const express = require("express");
const productRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const Product=  require("../models/Products");

productRoute.get("/", AsyncHandler(
    async (req,res) => {
        const product = await Products.find({});
        res.json(products);
    }
));

productRoute.get("/:id", AsyncHandler(
    async (req,res) => {
        const product = await Product.findById(req.params.id);

        if(product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product does not exist");
        }
    }
));

module.exports = productRoute
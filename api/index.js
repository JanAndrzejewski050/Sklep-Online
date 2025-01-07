const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const products = require("./data/Products");
const cors = reuire("cors");
const mongoose = require("mongoose");

// contact db
mongoose.connect('mongodb+srv://puzon2137:peXOLh5o7z8JQqTj@cluster0.m8rkf.mongodb.net/REACT-NODE-APP').then(() => console.log("db connected")).then((err) => {
    err;
})

const databaseSeeder = require('./databaseSeeder');
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use(express.json());

app.use(cors());

//seeder
app.use('/api/seed', databaseSeeder);

//routes for users
app.use('/api/users',userRoute);

//routes for products
app.use('/api/products',productRoute);

//routes for order
app.use("/api/orders",orderRoute);


app.listen(3000, ()=>{
    console.log('server listening on port 3000');
});



// puzon2137
// peXOLh5o7z8JQqTj

//janpawel2137
//kubus

//mongodb+srv://kubus:janpawel2137@cluster0.pwrvu.mongodb.net/Project-0

// mongodb+srv://puzon2137:peXOLh5o7z8JQqTj@cluster0.m8rkf.mongodb.net/REACT-NODE-APP


// test route
app.get("/api/products", (req, res) => {
    res.json(products);
})

// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((product) => product.id === Number(req.params.id));
//     res.json(product);
// });
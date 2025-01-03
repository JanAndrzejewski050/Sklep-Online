const express = require("express");
const app = express();
const products = require("./data/Products");

const mongoose = require("mongoose");

// contact db
mongoose.connect('mongodb+srv://puzon2137:peXOLh5o7z8JQqTj@cluster0.m8rkf.mongodb.net/REACT-NODE-APP').then(() => console.log("db connected")).then((err) => {
    err;
})

const databaseSeeder = require('./databaseSeeder');
app.use('/api/seed', databaseSeeder);
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
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



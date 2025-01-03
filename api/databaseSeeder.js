const router = require('express').Router();
const User = require('./models/User');
const users = require('./data/Users');
const Product = require('./models/Products');
const products = require('./data/Products');

router.post('/users', async (req,res) => {
    try {
        //usuń wszystko
        await User.deleteMany({});

        //dodaj wszystko
        const UserSeeder = await User.insertMany(users);
        
        res.send( {UserSeeder} );
    } catch (error) {
        res.status(500).json({ message: "Seeding users failed", error });
    }
});


router.post('/products', async (req,res) => {
    try {
        //usuń wszystko
        await Product.deleteMany({});

        //dodaj wszystko
        const ProductSeeder = await Product.insertMany(products);
        
        res.send( {ProductSeeder} );
    } catch (error) {
        res.status(500).json({ message: "Seeding products failed", error });
    }
});

module.exports = router;
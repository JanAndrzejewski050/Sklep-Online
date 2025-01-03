const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');

//logowanie i weryfikowanie podanego hasła
userRoute.post('/login', AsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) // if user exists
        {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null,
                createdAt: user.createdAt
            })
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }
));

//rejestracja
userRoute.post('/register', AsyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body;
        const existsUser = await User.findOne({ email })

        if (existsUser) {
            res.status(400);
            throw new Error("User already exists");
        } else {
            const user = await User.create({
                name,
                email,
                password
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                });
            } else {
                res.status(400);
                throw new Error("Invalid user");
            }
        }
    }
));

module.exports = userRoute;
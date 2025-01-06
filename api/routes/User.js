const express = require('express');
const userRoute = express.Router();
const AsyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../tokenGenerate');
const protect = require('../middleware/Auth');


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
                token: generateToken(user._id),
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

//dane profilu (+autoryzacja protect)
userRoute.get("/profile", protect, AsyncHandler(
    async (req, res) => {
        console.log(req);
        const user = await User.findById(req.user._id);
        if(user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
));

//update profilu użytkownika
userRoute.put("/profile", protect, AsyncHandler(
    async (req,res) => {
        const user = await User.findById(req.user._id);

        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body,email || user.email;
            
            if(req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
                createdAt: updatedUser.createdAt
            });

        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
))

module.exports = userRoute;
const jwt = require("jsonwebtoken");
const AsyncHandler=  require("express-async-handler");
const User = require("../models/User");

const protect = AsyncHandler(
    async (req, res, next) => {
        let token;
        console.log(req.headers.authorization);
        console.log(req.headers.authorization.startsWith("Bearer"));
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decodedToken.id).select("-password");
                next();
            } catch (error) {
                console.log(error);
            }
        }
        if(!token) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }
);

module.exports = protect;
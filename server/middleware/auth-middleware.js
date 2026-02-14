const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


const authMiddleware = async(req,res,next) => {
    const token = req.header("Authorization");
    console.log("req.header",req.header("Authorization"));

    /**
     * Step 01
     */
    if(!token){
        // if token is not present so user is not signed no need to give the access
        return res
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"});
    }

    /**
     * Step 02
     * // Assuming token is in format "Bearer <jwtToken>", Removing the "Bearer" prefix
     */
    const jwtToken = token.replace("Bearer","").trim();

    try {
        
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("is verified:",isVerified);

        const userData = await userModel.findOne({ email: isVerified.email }).select({
            password:0,
        })

        console.log("user data:",userData);
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token."})
    }
}

module.exports = authMiddleware;
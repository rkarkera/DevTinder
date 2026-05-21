const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_PSWD = process.env.JWT_PSWD;

const userAuth = async (req,res,next) => {
   try {
     const {token} = req.cookies;
     if(!token) {
        throw new Error("Invalid Token!!");
     }

     const { id } = jwt.verify(token,JWT_PSWD);

     const user = await User.findById(id);

     if(!user) {
        throw new Error("User not found!!");
     }

     req.user = user;
     next();
   } catch (error) {
      res.status(400).json({message:"something went wrong",err:error.message});
   }
}

module.exports = {userAuth}
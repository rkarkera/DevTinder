const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

router.get("/profile",userAuth,async(req,res) => {
  try {
    const user = req.user;
    res.status(200).json({message:"user found",user});
  } catch(err) {
    res.status(400).json({ message: "Something went wrong", err: err.message });
  }
})

router.patch("/profile/edit", userAuth, async(req,res) => {
  try {

    if(!validateEditProfileData(req.body)) {
      return res.status(400).json({message:"Invalid Edit Request"});
    }
  
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((el) => loggedInUser[el] = req.body[el]);

    const user =  await loggedInUser.save();

     const userObj = user.toObject();
         delete userObj.password;
    delete userObj.emailId;

    res.status(200).json({message:"User updated successfully",data: userObj});
   
   

  } catch (error) {
     res.status(400).json({message:error.message});
  }
})
module.exports = router;
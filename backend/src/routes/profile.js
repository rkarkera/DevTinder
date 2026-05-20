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
       throw new Error("Invalid Edit Request");
    }
  
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((el) => loggedInUser[el] = req.body[el]);

      await loggedInUser.save();
    res.status(200).json({message:"User updated successfully"});

  } catch (error) {
     res.status(400).json({err:error.message});
  }
})
module.exports = router;
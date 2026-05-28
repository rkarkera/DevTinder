const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { validateSignupData, validateLoginData } = require("../utils/validation");
const router = express.Router();

router.post("/signup", validateSignupData, async (req, res) => {
  try {

    const { firstName, lastName, email, password, age, gender, skills, about } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      gender,
      skills,
      about
    });
   user = await user.save();
     user = await User.findById(user._id).select("-password"); 
     const token = await user.getJwt();
      res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});
    res.status(201).json({ message: "User Added Successfully", user });
  } catch (err) {
    res.status(401).json({ message: "Failed to add user", err: err.message });
  }
});

router.post("/login", validateLoginData, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
       return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});
      res.status(200).json({ message: "Login Successfull",user });
    } else {
      res.status(400).json({
        message:
          "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", err: err.message });
  }
});

router.post("/logout", (req,res) => {
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.status(200).json({message:"logged out succesfully"});
})

module.exports = router;
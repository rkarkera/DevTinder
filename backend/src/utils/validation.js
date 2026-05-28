const validator = require("validator");
const User = require("../models/users");

const validateSignupData = async (req,res,next) => {
    try {
        const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      skills,
      about
    } = req.body;

    

    if (!firstName || firstName.length < 3) {
      return res.status(400).json({
        message: "First name must be at least 3 characters",
      });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (!password || !validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and symbol",
      });
    }

    if (!age || age < 18) {
      return res.status(400).json({
        message: "Age must be greater than 18",
      });
    }

    const allowedGender = ["male", "female", "other"];

    if (!allowedGender.includes(gender)) {
      return res.status(400).json({
        message: "Invalid gender",
      });
    }

    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Skills must be an array",
      });
    }

    if (about && about.length < 3) {
      return res.status(400).json({
        message: "about must be at least 3 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    } else {
        next();
    }
    } catch (error) {
        res.status(400).json({message:"Something went wrong"});
    }
    
}

const validateLoginData = (req,res,next) => {
    try {
      const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
   

    if (!password ) {
      return res.status(400).json({
        message:
          "wrong credentials",
      });
    }

    next();

    } catch(err) {
      res.status(400).json({message:"Something went wrong"});
    }
  

}

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

   if (!req.firstName || req.firstName.length < 3) {
     throw new Error("First name must be at least 3 characters");
    }

    
    if (req.age < 18) {
      throw new Error("Age must be greater than 18",);
    }

    const allowedGender = ["male", "female", "other"];

    if (!allowedGender.includes(req.gender)) {
      throw new Error("Invalid gender");
    }

    if (req.skills && !Array.isArray(req.skills)) {
      throw new Error("Skills must be an array");
    }

    if (req.about && req.about.length < 3) {
      throw new Error("About must be at least 3 characters");
    }

  const isEditAllowed = Object.keys(req).every((el) => allowedEditFields.includes(el));

  return isEditAllowed;
};

module.exports = {validateSignupData, validateEditProfileData, validateLoginData}

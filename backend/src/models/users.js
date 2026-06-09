const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    package: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1220827245/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette.jpg?s=1024x1024&w=is&k=20&c=o68EDsTw0pgAR8guOwhIdAQ1zOIok3XuOhAKiAgRhwk=",
    },
    about: {
      type: String,
      default: "This is the default about of the user!",
    },
    skills: {
      type: [String],
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_PSWD, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (userPassword) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(userPassword, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);

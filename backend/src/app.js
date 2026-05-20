const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDb()
  .then(() => {
    console.log("Database connection Successfull");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(() => {
    console.log("Database connection UnSuccessfull");
  });

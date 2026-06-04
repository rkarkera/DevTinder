require("dotenv").config();

const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/users");
const paymentRouter = require("./routes/payment");
const cors = require("cors");


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",paymentRouter);

const PORT = process.env.PORT;

connectDb()
  .then(() => {
    console.log("Database connection Successfull");
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database connection UnSuccessfull");
    console.log(err);
  });
